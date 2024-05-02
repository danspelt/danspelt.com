import ElevenLabs from "elevenlabs-node";
import { NextResponse } from "next/server";
 import { env } from "../../lib/config";

const voice = new ElevenLabs(b
    {
        apiKey: env.ELEVEN_LABS_API_KEY,
    }
);
export const GET = async (req) => {
  const text = 'Hello, I am your friendly voice assistant. How can I help you today?'
  const fileName = 'audios/message_rt.mp3';

  const audio = await voice.textToSpeech({
    fileName,
    textInput: text,
  });
 return NextResponse.json({
    message: await voice.getVoices(),
  }); 
};
