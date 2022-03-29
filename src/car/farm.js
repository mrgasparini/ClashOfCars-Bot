import schedule from 'node-schedule';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';
import { getToken } from '../auth/index.js';
import axios from 'axios';
import moment from 'moment';

export const scheduleRewardClaim = async function () {
    var autoClaimEnable = process.env.AUTO_CLAIM_ENABLE?.toUpperCase() === 'TRUE' ? true : false;

    if(autoClaimEnable)
        schedule.scheduleJob({
            rule: '1 0 * * *',
            tz: 'Etc/UTC'
        }, async () => { 
            const dateRace = moment().utc().add(-5, 'days').format('YYYY-MM-DD')
            console.log(`Realizando reward claim do dia: ${dateRace}. 💰 💰 💰`);

            const params = new getRequestParams({ dateRace: dateRace });
            var response = await axios.post('https://api.clashofcars.io/api/player/farm/history/reward/settlement',
            params.toString(),
            {
                headers: getRequestHeaders(await getToken())
            });

            if(response.data.success) {
                console.log(`Claim realizado com sucesso. Clash sacados: ${response.data.jsonData.clashReward} 💸 💸 💸`);
                console.log(`Saldo em conta após o claim. ${response.data.jsonData.remainingClashs} CLASHs 💰 💰 💰`);
            } else
            console.log("Ocorreu um erro ao realizar o claim. 🤨 🤨 🤨");
        })
}

export const racesAmountResume = async function () {
    var response = await axios.get(`https://api.clashofcars.io/api/player/farm/history?dateRace=${moment().utc().format('YYYY-MM-DD')}`,
    {
        headers: getRequestHeaders(await getToken())
    });

    if(response.data.success)
        console.log(`Total de clash farmados: ${Math.floor(response.data.jsonData.totalClashsExpectRedeem)}. 💸 💸 💸`);
}