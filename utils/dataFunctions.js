// utilsData.js
import fs from 'fs/promises';



const boletosFilePath = '/data/boletos.json'

export async function readBoletosData() {
    try {
        const data = await fs.readFile(boletosFilePath, { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer boletos.json:', error);
        throw error;
    }
}

export async function writeBoletosData(boletosData) {
    try {
        await fs.writeFile(boletosFilePath, JSON.stringify(boletosData, null, 2), { encoding: 'utf8' });
    } catch (error) {
        console.error('Error al escribir boletos.json:', error);
        throw error;
    }
}
