import { limitedRequest } from '../utils/rateLimit.js'
import { getToken } from '../auth/index.js';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';

export const repairRequest = async function (carUuid, carName) {
    console.log(`Realizando reparo no carro: ${carName}. 🔧 🔧 🔧`);
    const params = getRequestParams({ carUuid: carUuid });

    var response = await limitedRequest.post('https://api.clashofcars.io/api/player/car/repair',
        params.toString(),
        {
            headers: getRequestHeaders(await getToken())
        });

    console.log(`Reparo do carro ${carName} realizado com sucesso. 🛠️ 🛠️ 🛠️`);
    return response.data.jsonData.car.remaining_races_to_destroy;
}