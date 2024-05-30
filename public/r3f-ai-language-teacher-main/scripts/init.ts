import { getChunkedDocsFromPDF } from "../src/lib/pdf-loader";

(async () => {
  try {
    const chunks = await getChunkedDocsFromPDF();
    console.log("Chunks:", chunks);
  }
  catch (error) {
    console.error("Operation failed: ", error);
  }
})();
