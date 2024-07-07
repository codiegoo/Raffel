import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const boletosFilePath = path.join('./data/boletos.json');

export async function handler(event) {
  if (event.httpMethod === 'GET') {
    return getBoletos();
  } else if (event.httpMethod === 'POST') {
    return postBoletos(event);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }
}

function getBoletos() {
  try {
    const data = readFileSync(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ boletos: boletosData.boletos }),
    };
  } catch (error) {
    console.error('Error en GET:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Hubo un error en la solicitud GET' }),
    };
  }
}

async function postBoletos(event) {
  try {
    const formData = JSON.parse(event.body);
    const boletosSeleccionados = [];

    for (const value of formData) {
      boletosSeleccionados.push(parseInt(value));
    }

    const data = readFileSync(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);

    boletosData.boletos.forEach((boleto) => {
      if (boletosSeleccionados.includes(boleto.numero)) {
        if (!boleto.disponible) {
          boleto.numero = 'Comprado';
        }
        boleto.disponible = false;
      }
    });

    writeFileSync(boletosFilePath, JSON.stringify(boletosData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Boletos actualizados' }),
    };
  } catch (error) {
    console.error('Error en POST:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Hubo un error en la solicitud POST' }),
    };
  }
}
