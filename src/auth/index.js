import schedule from 'node-schedule';
import axios from 'axios';
import { getRequestHeaders, getRequestParams } from '../utils/request.js';

var token = '';
var clashAmountInGame = undefined;

const doLogin = async function () {
    const walletAddress = process.env.WALLET_ADDRESS;
    const params = getRequestParams({ publicKey: walletAddress }, true);

    var response = await axios.post('https://api.clashofcars.io/api/auth/player/login/security',
    params,
    {
        headers: getRequestHeaders()
    })

    if(response.data.success === true){
        token =  response.data.jsonData.token
        clashAmountInGame = Math.floor(response.data.jsonData.player.game_clashs_amount)
    } else
        token = '';
}

export const getToken = async function(force) {
    if(token === '' || force) 
        await doLogin();
    
    return token;
}

export const getClashAmount = async function(force) {
    if(clashAmountInGame || force) 
        await doLogin();
    
    return clashAmountInGame;
}

schedule.scheduleJob('0 * * * *', () => {
    console.log("Atualizando token");
    doLogin();
})