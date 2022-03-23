export const getRequestHeaders = function (token){
    if(token)
        return { 
            "authority":"api.clashofcars.io",
            "authorization": `Bearer ${token}`,
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
            "sec-ch-ua-platform":"Windows",
            "content-type":"application/x-www-form-urlencoded",
            "accept":"*/*",
            "origin":"https://game.clashofcars.io",
            "sec-fetch-site":"same-site",
            "sec-fetch-mode":"cors",
            "sec-fetch-dest":"empty",
            "referer":"https://game.clashofcars.io/",
            "accept-language":"en-US,en;q=0.9,pt;q=0.8"
        }
    else 
        return { 
            "authority":"api.clashofcars.io",
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
            "sec-ch-ua-platform":"Windows",
            "content-type":"application/x-www-form-urlencoded",
            "accept":"*/*",
            "origin":"https://game.clashofcars.io",
            "sec-fetch-site":"same-site",
            "sec-fetch-mode":"cors",
            "sec-fetch-dest":"empty",
            "referer":"https://game.clashofcars.io/",
            "accept-language":"en-US,en;q=0.9,pt;q=0.8"
        }
}

export const getRequestParams = function ({
    walletAddress,
    carUuid
}) {
    return new URLSearchParams({ 
        wallet_address: walletAddress ? walletAddress : undefined,
        carUuid: carUuid ? carUuid : undefined
    });
}