export function helpText() {
  return `Clinicabot Commands:
/help - show help
/reminder - create reminder
/location - share your area or attach Location
/consult - request teleconsultation
/tips - toggle daily wellness tips

Or type your symptoms in plain language (e.g., "my body dey hot").`;
}

export function formatFacilityList(list: any[]) {
  if (!list || list.length === 0) return "No facilities found near you.";
  return list.map((f, i) => `${i + 1}. ${f.name} — ${f.address || ""} ${f.distance || ""}\n${f.mapsUrl || ""}`).join("\n\n");
}

export function formatTriage(t: { risk: string; advice: string; escalate?: boolean }) {
  let out = `Risk level: ${t.risk.toUpperCase()}\n\n${t.advice}\n\nFor help: type /location or /consult.`;
  if (t.escalate) out += `\n\nThis looks concerning — consider urgent care now.`;
  return out;
}
