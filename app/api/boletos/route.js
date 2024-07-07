import fs from 'fs/promises';
import path from 'path';

const boletosFilePath = path.join(process.cwd(), 'data/boletos.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    return handlePost(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req, res) {
  try {
    const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);

    res.status(200).json({ boletos: boletosData.boletos });
  } catch (error) {
    console.error('Error en GET:', error);
    res.status(500).json({ error: 'Hubo un error en la solicitud GET' });
  }
}

async function handlePost(req, res) {
  try {
    const formData = await parseFormData(req);
    const boletosSeleccionados = [];

    for (const value of formData.values()) {
      boletosSeleccionados.push(parseInt(value));
    }

    const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);

    boletosData.boletos.forEach((boleto) => {
      if (boletosSeleccionados.includes(boleto.numero)) {
        if (!boleto.disponible) {
          boleto.numero = 'Comprado';
        }
        boleto.disponible = false;
      }
    });

    await fs.writeFile(boletosFilePath, JSON.stringify(boletosData, null, 2));

    res.status(200).json({ message: 'Boletos actualizados' });
  } catch (error) {
    console.error('Error en POST:', error);
    res.status(500).json({ error: error.message || 'Hubo un error en la solicitud POST' });
  }
}

async function parseFormData(req) {
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw new Error('Content-Type incorrecto o faltante, se esperaba multipart/form-data');
  }
  return req.body;
}
