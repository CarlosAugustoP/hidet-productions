import { NextApiRequest, NextApiResponse } from "next";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/pages/api/firebase/firebase";
import { v4 as uuidv4 } from 'uuid';
import formidable, { File as FormidableFile, IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Desativa o body parser para permitir multipart/form-data
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Inicialize o formidable para processar os arquivos
    const form = new IncomingForm();

    // Parse da requisição para extrair campos e arquivos
    form.parse(req, async (err: Error, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao processar upload' });
        return;
      }

    // Verifique se a API KEY está presente
    const password = Array.isArray(fields.password) ? fields.password[0] : fields.password;
    if (!password || password !== process.env.API_KEY) {
      res.status(401).json({ error: 'API KEY inválida' });
      return;
    }

      // Verifique se o arquivo foi realmente enviado
      const file = files.file as FormidableFile | FormidableFile[] | undefined;

      if (!file) {
        res.status(400).json({ error: 'Por favor, selecione uma mídia (imagem ou vídeo).' });
        return;
      }

      // Se houver múltiplos arquivos, pegue o primeiro (ou ajuste conforme sua lógica)
      const uploadedFile = Array.isArray(file) ? file[0] : file;

      // Gera o nome único do arquivo
      const fileName = uploadedFile.originalFilename + "_" + uuidv4();

      // Lê o arquivo do caminho temporário
      const fileData = fs.readFileSync(uploadedFile.filepath);

      // Faz o upload para o Firebase Storage
      const imageRef = ref(storage, `images/${fileName}`);
      const snapshot = await uploadBytes(imageRef, fileData, { contentType: 'image/png' });
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Retorna a URL de download
      res.status(200).json({ downloadURL });
    });
  } else {
    res.status(405).json({ error: `Método ${req.method} não permitido.` });
  }
}
