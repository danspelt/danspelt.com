import { getChunkedDocsFromPDF } from "../src/lib/pdf-loader";
import {storeChunks} from "../src/lib/vector-store";
(async () => {
  try {
    const chunks = await getChunkedDocsFromPDF();
    console.log("Chunks:", chunks);
    await storeChunks(chunks, "knowledge");
  }
  catch (error) {
    console.error("Operation failed: ", error);
  }
})();
