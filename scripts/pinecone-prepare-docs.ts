import { getChunkedDocsFromPDF } from "../lib/pdf-loader";
import { storeChunks } from "../lib/vector-store";

// Simulate the embedding and storing process in a Qdrant collection named "test"
(async () => {
  try {
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF(); // Load chunks from PDF
    console.log(`Loading ${docs.length} chunks into Qdrant`);
    await storeChunks(docs, "test");  // Store chunks in Qdrant collection
    console.log("Data embedded and stored in Qdrant 'test' index");
  } catch (error) {
    console.error("Operation failed: ", error);
  }
})();
