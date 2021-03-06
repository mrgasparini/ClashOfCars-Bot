import schedule from 'node-schedule';
import dotenv from 'dotenv';
import { getToken } from './auth/index.js'
import { getAllCars } from './car/car.js'
import { scheduleRefuels } from './car/refuel.js'
import { scheduleRewardClaim } from './car/farm.js'
import { scheduleAutoBoxPurchase } from './car/box.js'
import { verifyAppVersion } from './utils/version.js'

dotenv.config();

export const startProcess = async function() {
    try{
        await verifyAppVersion();
        console.log("Aplicação iniciada com sucesso. Let's run!! 🏎️ 🏎️ 🏎️");
        await getToken();
        var cars = await getAllCars();
        await scheduleRefuels(cars);
        await scheduleRewardClaim();
        await scheduleAutoBoxPurchase();
    } catch(e) {
        console.log(e);
        console.log("Erro de credenciais. Reiniciando aplicação... 🔃 🔃 🔃");
        startProcess();
    }
}

schedule.scheduleJob('0 */12 * * *', () => {
    startProcess();
})