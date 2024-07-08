import { NextResponse } from 'next/server';
import { getBoletos, putBoletos } from '@/utils/dbFunctions';


export async function GET(request) {
  try {
    
    const boletos = await getBoletos()

    // Retornar los boletos en la respuesta como JSON utilizando NextResponse
    return NextResponse.json({boletos});
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


    await putBoletos(boletosSeleccionados)

    // Construir la respuesta exitosa
    return NextResponse.json('Boletos actualizados');

  } catch (error) {
    console.error('Error en POST:', error);
    // Retornar una respuesta de error
    return NextResponse.json({ error: error.message || 'Hubo un error en la solicitud POST' }, { status: 500 });
  }
}