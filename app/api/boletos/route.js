import fs from 'fs/promises';
import path from 'path'


const boletosFilePath = path.join('./data/boletos.json')

export async function GET() {
  try {
    // Leer el archivo de boletos de manera asíncrona utilizando fs.promises.readFile
    const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
    const boletosData = JSON.parse(data);
    const boletos = JSON.stringify(boletosData)

    // Retornar los boletos en la respuesta como JSON
    return new Response(
      {
        statusCode: 200,
        body: JSON.stringify({ boletos: boletosData.boletos }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error en GET:', error);
    // Retornar una respuesta de error
    return new Response({ error: 'Hubo un error en la solicitud GET' })
  }
}

export async function POST(request) {
  try {
    // Obtener los boletos seleccionados del cuerpo de la solicitud
    const formData = await request.formData();
    console.log(formData)
    const boletosSeleccionados = [];


    for (const value of formData.values()) {
      boletosSeleccionados.push(parseInt(value)); // Parsear a entero si es necesario
    }
    console.log({message:"boletos seleccionados: ", boletosSeleccionados})
    // for (const entry of formData.entries()) {
    //   boletosSeleccionados.push(parseInt(entry[1])); // Parsear a entero si es necesario
    // }

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
    return new Response(JSON.stringify("Boletos actualizados"));

  } catch (error) {
    console.error('Error en POST:', error);
    // Retornar una respuesta de error
    return new Response({ error: error });
  }
}