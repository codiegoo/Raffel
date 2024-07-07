

import { readBoletosData, writeBoletosData } from "@/utils/dataFunctions";

export default async (event, context) => {
    try {
        const formData = JSON.parse(event.body);
        let boletosData = await readBoletosData();

        boletosData.boletos.forEach((boleto) => {
            if (formData.includes(boleto.numero)) {
                boleto.disponible = false;
            }
        });

        await writeBoletosData(boletosData);

        return new Response({
            statusCode: 200,
            body: JSON.stringify({ message: 'Boletos actualizados correctamente' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error en POST:', error);
        return new Response({
            statusCode: 500,
            body: JSON.stringify({ error: 'Hubo un error en la solicitud POST' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

