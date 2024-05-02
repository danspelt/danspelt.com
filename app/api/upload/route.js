// pages/api/upload.js
import Busboy from 'busboy';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export function POST(req, res) {
        const busboy = new Busboy({ headers: req.headers });

        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            // Create a write stream to save file
            const saveTo = path.join(process.cwd(), 'uploads', filename);
            const writeStream = fs.createWriteStream(saveTo);
            file.pipe(writeStream);
        });

        busboy.on('finish', function() {
            res.writeHead(200, { 'Connection': 'close' });
            res.end("That's all folks!");
        });

    return NextResponse({message: 'File uploaded', status: 200});
}
