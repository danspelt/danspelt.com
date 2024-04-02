import ElevenLabs from "elevenlabs-node";
import { NextResponse } from "next/server";

const elevenLabsApiKey = process.env.PUBLIC_NEXT_ELEVEN_LABS_API_KEY;

const voice = new ElevenLabs(
    {
        apiKey: elevenLabsApiKey,
    }
);
export const GET = async (req) => {
 return NextResponse.json({
    message: await voice.getVoices(),
  }); 
};
