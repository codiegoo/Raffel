
import connectMongoDB from "@/libs/mongodb";
import Boleto from "@/models/boletos";


export async function getBoletos() {
  try {
    await connectMongoDB(); // Conectar a la base de datos MongoDB

    const boletos = await Boleto.find({}).exec(); // Obtener todos los boletos

    return boletos;

  } catch (error) {
    console.error('Error al obtener todos los boletos:', error);
    throw error;
  }
}

export async function putBoletos(boletosSeleccionados) {
  try {
    await connectMongoDB(); // Conectar a la base de datos MongoDB

    // Obtener todos los boletos desde la base de datos
    const result = await Boleto.find({}).exec();
    // Verificar si hay resultados y extraer el primer documento
    const boletos = result.length > 0 ? result[0].boletos : [];

    // Modificar los boletos seleccionados
    for (let i = 0; i < boletos.length; i++) {
      if (boletosSeleccionados.includes(boletos[i].numero)) {
        boletos[i].disponible = false; // Marcar como no disponible
        boletos[i].numero = 0; // Poner el número en 0
      }
    }

    // Guardar los boletos modificados en la base de datos
    await result[0].save();

    console.log('Boletos actualizados correctamente');

  } catch (error) {
    console.error('Error al actualizar boletos:', error);
    throw error;
  }
}