import { readBoletosData } from "@/utils/dataFunctions";

export default async (event, context) => {
    try {
        const boletosData = await readBoletosData();

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
