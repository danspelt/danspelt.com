import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";
import { env } from "../../lib/config";

export const GET = async (req) => {
  const elevenLabsClient = new ElevenLabsClient({
    apiKey: env.ELEVEN_LABS_API_KEY,
  });
  const voices = await elevenLabsClient.voices.getAll();
  return NextResponse.json({
    message: voices,
  });
};
