// Public browser key. Restrict its websites and APIs in Google Cloud.
// Local builds read frontend/.env.local; GitHub builds read Actions settings.
export const GOOGLE_MAPS_API_KEY = import.meta.env.GOOGLE_MAPS_API_KEY?.trim() || "";
export const GOOGLE_MAPS_PLACE_ID = import.meta.env.GOOGLE_MAPS_PLACE_ID?.trim() || "ChIJrzXJpY9hJaYR6H4EusAGIEs";
