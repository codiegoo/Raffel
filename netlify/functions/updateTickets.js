

import fs from 'fs/promises';

const boletosFilePath = "../../data/boletos.json"

export async function handler(event, context) {
    try {
        const formData = JSON.parse(event.body);

        const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
        const boletosData = JSON.parse(data);

        boletosData.boletos.forEach((boleto) => {
            if (formData.includes(boleto.numero)) {
                boleto.disponible = false;
            }
        });

        await fs.writeFile(boletosFilePath, JSON.stringify(boletosData, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Boletos actualizados correctamente' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        console.error('Error en POST:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Hubo un error en la solicitud POST' })
        };
    }
}
