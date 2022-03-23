import axios from 'axios';
import { getToken } from '../auth/index.js';
import { getRequestHeaders } from '../utils/request.js';


export const getAllCars = async function () {
    var response = await axios.get('https://api.clashofcars.io/api/player/cars/all',
    {
        headers: getRequestHeaders(await getToken())
    })
    
    if(response.data.success === true)
        return response.data.jsonData.cars.map(c => {
            return {
                uuid: c.uuid,
                editionName: c.edition_name,
                remainingRacesToDestroy: c.remaining_races_to_destroy,
                dateLastRefuel: c.date_last_refuel,
                currentRefuel: c.currenty_fuel
            }
        })
    else
        return []
}