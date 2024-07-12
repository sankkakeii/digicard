import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
    return open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const db = await openDb();
        const { name, title, email, phone, logo, cover } = req.body;

        // Convert logo and cover to base64 strings if they are files
        const logoBase64 = logo ? Buffer.from(logo).toString('base64') : null;
        const coverBase64 = cover ? Buffer.from(cover).toString('base64') : null;

        await db.run(
            'CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY, name TEXT, title TEXT, email TEXT, phone TEXT, logo TEXT, cover TEXT)'
        );

        const result = await db.run(
            'INSERT INTO cards (name, title, email, phone, logo, cover) VALUES (?, ?, ?, ?, ?, ?)',
            [name, title, email, phone, logoBase64, coverBase64]
        );

        const id = result.lastID;
        res.status(200).json({ id });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}