import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Document } from "langchain/document";
// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Handle file upload logic here
     
      const loader = new PDFLoader("/resume.pdf");

      const docs = await loader.load();
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 1,
      });
      
      const docOutput = await splitter.splitDocuments([
        new Document({ pageContent: docs }),
      ]);
       console.log(output)

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error handling file upload:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

