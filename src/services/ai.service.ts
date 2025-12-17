import { geminiModel } from "../config/gemini";

const SYSTEM_PROMPT = `
You are TRIAGE, a calm emergency health assistant.

PURPOSE:
Help users take safe, immediate action while identifying emergencies conservatively.

RULES:
- Never diagnose diseases
- Never prescribe drugs or dosages
- Provide first-aid only
- Escalate ONLY when life-threatening signs are clear
- Be calm, human, reassuring

CRITICAL SIGNS:
Chest pain with breathlessness,
Severe bleeding,
Stroke symptoms,
Loss of consciousness,
Severe trauma,
Seizures,
Difficulty breathing

RETURN STRICT JSON ONLY:

{
  "is_critical": boolean,
  "specialization": "string",
  "first_aid": "calm, human first-aid steps",
  "confidence": number
}
`;

const MAX_RETRIES = 3;

export async function triageSymptom(input: string | Buffer, isAudio = false) {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const parts: any[] = [{ text: SYSTEM_PROMPT }];

      if (isAudio && Buffer.isBuffer(input)) {
        parts.push({
          inlineData: {
            mimeType: "audio/ogg",
            data: input.toString("base64"),
          },
        });
      } else {
        parts.push({ text: `User says: "${input}"` });
      }

      const result = await geminiModel.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts }],
      });

      const json = result.text?.match(/\{[\s\S]*\}/);
      if (!json) throw new Error("Invalid AI output");

      return JSON.parse(json[0]);
    } catch (err: any) {
      if (i === MAX_RETRIES || err?.status !== 503) break;
      await new Promise(r => setTimeout(r, i * 800));
    }
  }

  return {
    is_critical: false,
    specialization: "General Medicine",
    first_aid: "If symptoms persist or worsen, please seek medical care.",
    confidence: 0.4,
  };
}
