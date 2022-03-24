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
            tz: 'Europe/Lisbon'
        }, async () => { 
            console.log(`Realizando reward claim do dia: ${dateRace}. 💰 💰 💰`);

            const params = new getRequestParams({ dateRace: moment().utc().add(-5, 'days').format('YYYY-MM-DD') });
            await axios.post('https://api.clashofcars.io/api/player/farm/history/reward/settlement',
            params.toString(),
            {
                headers: getRequestHeaders(await getToken())
            });
        })
}
export const racesAmountResume = async function () {
    var response = await axios.get(`https://api.clashofcars.io/api/player/farm/history?dateRace=${moment().utc().format('YYYY-MM-DD')}`,
    {
        headers: getRequestHeaders(await getToken())
    });

    if(response.data.success)
        console.log(`Total de clash farmados: ${response.data.jsonData.totalClashsExpectRedeem}. 💸 💸 💸`);
}