import ElevenLabs from "elevenlabs-node";
import { NextResponse } from "next/server";
 import { env } from "../../lib/config";

const voice = new ElevenLabs(
    {
        apiKey: env.ELEVEN_LABS_API_KEY,
    }
);
export const GET = async (req) => {
 return NextResponse.json({
    message: await voice.getVoices(),
  }); 
};
