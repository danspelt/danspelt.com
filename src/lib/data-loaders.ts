import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "./config";
import { JSDOM } from "jsdom";

async function getChunkedDocs(loader) {
  try {
    const docs = await loader.load();
  
    // Ensure newlines are replaced
    for (let i = 0; i < docs.length; i++) {
      docs[i].pageContent = docs[i].pageContent.replace(/\n/g, '');
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);

    // Log the chunked docs
    console.log("Chunked Docs:", chunkedDocs);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("Docs chunking failed!");
  }
}

export async function getChunkedDocsFromPDF() {
  const loader = new PDFLoader(env.PDF_PATH);
  return getChunkedDocs(loader);
}

export async function getChunkedDocsFromGitHub(repoUrl: string) {
  const loader = new GithubRepoLoader(repoUrl);
  return getChunkedDocs(loader);
}

export async function getChunkedDocsFromDirectory(directoryPath: string) {
  const loader = new DirectoryLoader(
    directoryPath,
    {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
    }
  );
  return getChunkedDocs(loader);
}

export async function getChunkedDocsFromWord(docxPath: string) {
  const loader = new DocxLoader(docxPath); // Create function for Word documents
  return getChunkedDocs(loader);
}

export async function getChunkedDocsFromWeb(url: string) {
  const loader = new PuppeteerWebBaseLoader(url, {
    evaluate: async (page) => {
      const content = await page.content();
      const dom = new JSDOM(content);
      return dom.window.document.body.textContent || "";
    }
  });
  return getChunkedDocs(loader);
}

export async function getChunkedDocsFromText(txtPath: string) {
  const loader = new TextLoader(txtPath);
  return getChunkedDocs(loader);
}
