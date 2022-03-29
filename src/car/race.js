import { getToken } from '../auth/index.js';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';
import { repairRequest } from './maintenance.js'
import { racesAmountResume } from './farm.js'
import { limitedRequest } from '../utils/rateLimit.js'

export const doFarmRace = async function (car) {
    console.log(`Iniciando corridas do carro: ${car.editionName}. 🚦 🚦 🚦`);
    console.log(`Quantidade de corridas a serem feitas: ${car.currentRefuel}. 💨 💨 💨`);
    var remainingRacesToDestroy = car.remainingRacesToDestroy;
    var racesCount = 0;

    while(racesCount < car.currentRefuel) {
        await new Promise(async (resolve) => {
            setTimeout(async function() {
                var response;
                if(remainingRacesToDestroy > 0) {
                    response = await raceRequest(car.uuid)
                }
                else {
                    console.log(`Ops!! O carro quebrou. Enviando para a oficina... 👨‍🔧 👨‍🔧 👨‍🔧`);
                    var newRemainingRaces = await repairRequest(car.uuid, car.editionName);
                    remainingRacesToDestroy = newRemainingRaces;
                    response = await raceRequest(car.uuid);
                }
                if(response.data.success){
                    racesCount++;
                    console.log(`${car.editionName}. Corrida #${racesCount} realizada com sucesso. ${response.data.jsonData.race.player_position}º lugar. 🏁 🏁 🏁`);
                }
                resolve();
            }, 20000)
        })
    }
    console.log(`Finalizando corridas do carro ${car.editionName}. 🏆 🏆 🏆`);
    racesAmountResume();
}

const raceRequest = async function (carUuid) {
    const params = getRequestParams({ carUuid: carUuid });

    return await limitedRequest.post('https://api.clashofcars.io/api/player/farm/new/race',
        params.toString(),
        {
            headers: getRequestHeaders(await getToken())
        });
}