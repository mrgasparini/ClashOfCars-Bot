import { getToken } from '../auth/index.js';
import schedule from 'node-schedule';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';
import { doFarmRace } from './race.js'
import moment from 'moment';
import { limitedRequest } from '../utils/rateLimit.js'

export const scheduleRefuels = async function (cars){
    for await (let c of cars) {
        if(c.currentRefuel > 0)
            doFarmRace(c);

        var lastRefuelUtc = moment.utc(c.dateLastRefuel).toISOString();
        var hoursSinceLastUpdate = moment.utc().diff(lastRefuelUtc, 'hours');

        if(hoursSinceLastUpdate >= 24 || c.dateLastRefuel === null) {
            var refueledCar = await refuelRequest(c.uuid, c.editionName);
            
            doFarmRace(refueledCar);
        } else {
            var nextRefuel = moment.utc(c.dateLastRefuel).add(1, 'days').utc().toISOString();

            schedule.scheduleJob(nextRefuel, async function (car) {
                var refueledCar = await refuelRequest(car.uuid, car.editionName);
                await doFarmRace(refueledCar);
            }.bind(null, c))
        }
    }

    console.log(`Reabastecimento dos carros agendados com sucesso. 🥇 🥇 🥇`);
}

const refuelRequest = async function (carUuid, carName) {
    const params = new getRequestParams({ carUuid: carUuid });
    var response;
    var success = false;

    console.log(`Realizando refuel do carro: ${carName}. 🛢️ 🛢️ 🛢️`);
    while(success === false) {
        await new Promise(async (resolve) => {
            try{
                response = await limitedRequest.post('https://api.clashofcars.io/api/player/car/refuel',
                params.toString(),
                {
                    headers: getRequestHeaders(await getToken())
                });
        
                success = response.data.success;
            } catch(e) {
                await getToken(true)
            }
            
            resolve();
        })
    }

    return {
        uuid: response.data.jsonData.car.uuid,
        editionName: response.data.jsonData.car.edition_name,
        remainingRacesToDestroy: response.data.jsonData.car.remaining_races_to_destroy,
        dateLastRefuel: response.data.jsonData.car.date_last_refuel,
        currentRefuel: response.data.jsonData.car.currenty_fuel
    }
}