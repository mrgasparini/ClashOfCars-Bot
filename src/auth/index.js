import schedule from 'node-schedule';
import axios from 'axios';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';

var token = '';

const doLogin = async function () {
    const walletAddress = process.env.WALLET_ADDRESS;
    const params = getRequestParams({ wallet_address: walletAddress });

    var response = await axios.post('https://api.clashofcars.io/api/auth/player/login',
    params.toString(),
    {
        headers: getRequestHeaders()
    })

    if(response.data.success === true){
        token =  response.data.jsonData.token
    } else
        token = '';
}

export const getToken = async function() {
    if(token === '') 
        await doLogin();
    
    return token;
}

schedule.scheduleJob('0 * * * *', () => {
    console.log("Atualizando token");
    doLogin();
})