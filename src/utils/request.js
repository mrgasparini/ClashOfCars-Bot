import url from 'url';
export const getRequestHeaders = function (token){
    if(token)
        return { 
            "authorization": `Bearer ${token}`,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
        }
    else 
        return { 
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
        }
}

export const getRequestParams = function ({
    walletAddress,
    carUuid,
    dateRace
}) {
    const paramsObject = {}

    walletAddress ? paramsObject.wallet_address = walletAddress : undefined
    carUuid ? paramsObject.carUuid = carUuid : undefined
    dateRace ? paramsObject.dateRace = dateRace : undefined

    return new URLSearchParams(paramsObject);
}