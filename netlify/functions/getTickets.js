import fs from 'fs/promises';

// Ruta absoluta al archivo boletos.json
const boletosFilePath = '/data/boletos.json'

export default async (event, context) => {
    try {
        const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
        const boletosData = JSON.parse(data);
        
        return new Response(JSON.stringify({ boletos: boletosData.boletos }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error en GET:', error);
        return new Response(JSON.stringify({ error: 'Hubo un error en la solicitud GET' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
