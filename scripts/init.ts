import { getChunkedDocsFromText } from "../src/lib/data-loaders";
import {storeChunks} from "../src/lib/vector-store";
(async () => {
  try {
    const chunks = await getChunkedDocsFromText("./docs/bio.txt");
    await storeChunks(chunks, "knowledge");
  }
  catch (error) {
    console.error("Operation failed: ", error);
  }
})();
