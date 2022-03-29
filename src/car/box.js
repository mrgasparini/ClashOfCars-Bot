import schedule from 'node-schedule';
import { getRequestHeaders, getRequestParams } from '../utils/request.js'
import { getToken, getClashAmount} from '../auth/index.js'
import axios from 'axios';
import { startProcess } from '../app.js'

export const scheduleAutoBoxPurchase = async function () {
    var autoBuyEnable = process.env.AUTO_PURCHASE_ENABLE?.toUpperCase() === 'TRUE' ? true : false;

    const minimumValueToPurchase = process.env.MINIMUM_VALUE_TO_PURCHASE
    
    if(!minimumValueToPurchase || minimumValueToPurchase < 1000)
        return;

    var clashAmountInGame = await getClashAmount();

    if(autoBuyEnable && clashAmountInGame >= +minimumValueToPurchase)
        schedule.scheduleJob({
            rule: '5 0 * * *',
            tz: 'Etc/UTC'
        }, async () => { 
            console.log(`Realizando auto compra de baú. 🎁 🎁 🎁`);
            const units = process.env.UNITS_TO_PURCHASE;

            const params = new getRequestParams({ amount: units && Number.isInteger(units) ? Math.floor(minimumValueToPurchase / (units * 1000)): 1 });
            var response = await axios.post('https://api.clashofcars.io/api/player/services/buy/misterybox',
            params.toString(),
            {
                headers: getRequestHeaders(await getToken())
            });

            if(response.data.success) {
                console.log(`Box comprada com sucesso. 🥳 🥳 🥳`);
                await OpenBoxes();
            } else
            console.log("Ocorreu um erro ao realizar o claim. 🤨 🤨 🤨");
        })
}

export const OpenBoxes = async function () {
    var getBoxesResponse = await axios.get(`https://api.clashofcars.io/api/player/chests/all`,
    {
        headers: getRequestHeaders(await getToken())
    });

    if(getBoxesResponse.data.success) {
        const boxesToOpen = getBoxesResponse.data.jsonData.chests.filter(c => c.used === false)

        console.log(`Realizando abertura de caixas. 🥡 🥡 🥡`);
        for await(let box of boxesToOpen){
            await openBoxRequest(box)
        }

        console.log('Abertura de caixas realizadas com sucesso! 🚗 🚗 🚗')
        startProcess();
    }
}

const openBoxRequest = async function (box) {
    const params = new getRequestParams({ chestUuid: box.uuid });
    var response;
    var success = false;

    while(success === false) {
        await new Promise(async (resolve) => {
            try{
                response = await axios.post('https://api.clashofcars.io/api/player/open/chest',
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

    return;
}