import { QdrantClient } from "@qdrant/js-client-rest";

import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";

export const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});
export const addVectorsToTestCollection = async () => {
  const texts = [
    "Hello, how are you?",
    "What is the weather like today?",
    "Artificial intelligence is transforming industries.",
  ];

  const vectorStore = new QdrantVectorStore(client, {
    url: process.env.QDRANT_URL,  // URL of the Qdrant server
    collectionName: "test",
  });

  const openAIEmbeddings = new OpenAIEmbeddings();

  try {
    await vectorStore.
      texts: texts,
      embeddingsModel: openAIEmbeddings
    });
    console.log('Vectors added successfully to the "test" collection.');
  } catch (error) {
    console.error("Error adding vectors to the collection:", error);
  }
};

export const addVector = async () => {
  const vectorStore = await QdrantVectorStore.fromTexts(
    [
      `Tortoise: Labyrinth? Labyrinth? Could it Are we in the notorious Little
Harmonic Labyrinth of the dreaded Majotaur?`,
      `Achilles: Yiikes! What is that?`,
      `Tortoise: They say-although I person never believed it myself-that an I
            Majotaur has created a tiny labyrinth sits in a pit in the middle of
            it, waiting innocent victims to get lost in its fears complexity.
            Then, when they wander and dazed into the center, he laughs and
            laughs at them-so hard, that he laughs them to death!`,
      `Achilles: Oh, no!`,
      `Tortoise: But it's only a myth. Courage, Achilles.`,
    ],
    [{ id: 2 }, { id: 1 }, { id: 3 }, { id: 4 }, { id: 5 }],
    new OpenAIEmbeddings(),
    {
      url: process.env.QDRANT_URL,
      collectionName: "goldel_escher_bach",
    }
  );
  return vectorStore;
};

/*
[
  Document { pageContent: 'Achilles: Oh, no!', metadata: {} },
  Document {
    pageContent: 'Achilles: Yiikes! What is that?',
    metadata: { id: 1 }
  }
]
*/