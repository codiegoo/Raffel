

import fs from 'fs/promises';

const boletosFilePath = '../data/boletos.json'

export async function handler(event, context) {
    try {
        const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
        const boletosData = JSON.parse(data);
        return {
            statusCode: 200,
            body: JSON.stringify({ boletos: boletosData.boletos }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        console.error('Error en GET:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Hubo un error en la solicitud GET' })
        };
    }
}
