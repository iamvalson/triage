import axios from "axios";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export async function findNearestSpecialist(
  specialization: string,
  lat: number,
  lon: number
) {
  const query = `
  [out:json];
  (
    node["amenity"="hospital"]["emergency"="yes"](around:5000,${lat},${lon});
    way["amenity"="hospital"]["emergency"="yes"](around:5000,${lat},${lon});
  );
  out center tags;
  `;

  const { data } = await axios.post(OVERPASS_URL, query, {
    headers: { "Content-Type": "text/plain" },
  });

  if (!data.elements?.length) {
    throw new Error("No emergency facilities nearby");
  }

  const f = data.elements[0];

  return {
    name: f.tags?.name || "Emergency Hospital",
    address: f.tags?.["addr:full"] || "Address unavailable",
    mapsUrl: `https://www.google.com/maps?q=${lat},${lon}`,
  };
}
