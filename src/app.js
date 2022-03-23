import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { getToken } from './auth/index.js'
import { getAllCars } from './car/car.js'
import { scheduleRefuels } from './car/refuel.js'

dotenv.config();

export const startProcess = async function() {
    try{
        console.log("Aplicação iniciada com sucesso. Let's run!! 🏎️ 🏎️ 🏎️");

        await getToken();
        var cars = await getAllCars();
        await scheduleRefuels(cars);
        
    } catch(e) {
        console.log("Erro de credenciais. Reiniciando aplicação... 🔃 🔃 🔃");
        startProcess();
    }
}

schedule.scheduleJob('0 */12 * * *', () => {
    startProcess();
})