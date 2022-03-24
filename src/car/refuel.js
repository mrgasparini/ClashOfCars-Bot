import axios from 'axios';
import { getToken } from '../auth/index.js';
import schedule from 'node-schedule';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';
import { doFarmRace } from './race.js'
import { racesAmountResume } from './farm.js'
import moment from 'moment'

export const scheduleRefuels = async function (cars){
    for await (let c of cars) {
        if(c.currentRefuel > 0)
            doFarmRace(c);

        var lastRefuelUtc = moment(c.dateLastRefuel).add(-3, 'hours').utc().toISOString();
        var hoursSinceLastUpdate = moment.utc().diff(lastRefuelUtc, 'h');
        
        if(hoursSinceLastUpdate >= 24) {
            var refueledCar = await refuelRequest(c.uuid, c.editionName);
            
            await doFarmRace(refueledCar);
            await racesAmountResume();
        } else {
            var nextRefuel = moment(c.dateLastRefuel).add(21, 'hours').utc().toISOString();

            schedule.scheduleJob(nextRefuel, async function (car) {
                var refueledCar = await refuelRequest(car.uuid, car.editionName);
                await doFarmRace(refueledCar);
                await racesAmountResume();
            }.bind(null, c));
        }
    }

    console.log(`Reabastecimento dos carros agendados com sucesso. 🥇🥇🥇`);
}

const refuelRequest = async function (carUuid, carName) {
    const params = new getRequestParams({ carUuid: carUuid });
    var response;
    var success = false;

    console.log(`Realizando refuel do carro: ${carName}. 🛢️ 🛢️ 🛢️`);
    while(success === false) {
        await new Promise(async (resolve) => {
            setTimeout(async () => {
                try{
                    response = await axios.post('https://api.clashofcars.io/api/player/car/refuel',
                    params.toString(),
                    {
                        headers: getRequestHeaders(await getToken())
                    });
            
                    success = response.data.success;
                } catch(e) {}
                
                resolve();
            }, 5000)
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