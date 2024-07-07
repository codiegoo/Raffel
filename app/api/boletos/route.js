import { NextResponse } from 'next/server';
import fs from 'fs/promises';
const boletosFilePath = './data/boletos.json'

export async function GET() {
  try {
    // Leer el archivo de boletos de manera asíncrona utilizando fs.promises.readFile
    const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);

    // Retornar los boletos en la respuesta como JSON utilizando NextResponse
    return NextResponse.json({ boletos: boletosData.boletos });
  } catch (error) {
    console.error('Error en GET:', error);
    // Retornar una respuesta de error utilizando NextResponse
    return NextResponse.json({ error: 'Hubo un error en la solicitud GET' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Obtener los boletos seleccionados del cuerpo de la solicitud
    const formData = await request.formData();
    const boletosSeleccionados = [];


    for (const value of formData.values()) {
      boletosSeleccionados.push(parseInt(value)); // Parsear a entero si es necesario
    }


    // Leer el archivo de boletos de manera asíncrona utilizando fs.promises.readFile
    const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);

    // Modificar los boletos seleccionados
    boletosData.boletos.forEach((boleto) => {
      if (boletosSeleccionados.includes(boleto.numero)) {
        if (!boleto.disponible) {
          boleto.numero = 'Comprado'; // Cambia el número por el texto cuando no está disponible
        }
        boleto.disponible = false; // Marca como no disponible
      }
    });

    // Escribir de vuelta los datos al archivo de manera asíncrona utilizando fs.promises.writeFile
    await fs.writeFile(boletosFilePath, JSON.stringify(boletosData, null, 2));

    // Construir la respuesta exitosa
    return NextResponse.json('Boletos actualizados');

  } catch (error) {
    console.error('Error en POST:', error);
    // Retornar una respuesta de error
    return NextResponse.json({ error: error.message || 'Hubo un error en la solicitud POST' }, { status: 500 });
  }
}