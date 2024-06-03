import { getChunkedDocsFromWeb } from "../src/lib/data-loaders";
import {storeChunks} from "../src/lib/vector-store";
(async () => {
  try {
    const chunks = await getChunkedDocsFromWeb("https://www.linkedin.com/in/dan-spelt/");
    await storeChunks(chunks, "knowledge");
  }
  catch (error) {
    console.error("Operation failed: ", error);
  }
})();
