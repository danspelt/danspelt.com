import { createMp3FromText, mp3ToWavToJson } from "../app/lib/aiUtils";

(async () => {
  try {
    const welcomeMessage = "Welcome! My name is Pathfinder. Ask me anything about Dan Spelt's professional journey.";
    const welcomeMessageId = "init";
    const processingMessage = "Processing your question please wait...";
    const processingMessageId = "processing";
    await createMp3FromText(welcomeMessage, welcomeMessageId);
    await mp3ToWavToJson(welcomeMessageId);
    await createMp3FromText(processingMessage, processingMessageId);
    await mp3ToWavToJson(processingMessageId);
  }
  catch (error) {
    console.error("Operation failed: ", error);
  }
})();
