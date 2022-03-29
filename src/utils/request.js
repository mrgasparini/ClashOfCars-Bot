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
    publicKey,
    carUuid,
    dateRace,
    amount,
    chestUuid
}, isLogin) {
    const paramsObject = {}

    publicKey ? paramsObject.message = "Sign this message to prove your authenticity!" : undefined
    publicKey ? paramsObject.publicKey = publicKey : undefined
    carUuid ? paramsObject.carUuid = carUuid : undefined
    dateRace ? paramsObject.dateRace = dateRace : undefined
    amount ? paramsObject.units = amount : undefined
    chestUuid ? paramsObject.chestUuid = chestUuid : undefined
    publicKey ? paramsObject.signedMessage =  {
        "type": "Buffer",
        "data": [
            3,
            14,
            153,
            104,
            217,
            21,
            66,
            139,
            76,
            70,
            126,
            141,
            186,
            224,
            236,
            213,
            171,
            103,
            244,
            25,
            172,
            146,
            230,
            255,
            99,
            170,
            76,
            244,
            108,
            70,
            122,
            62,
            18,
            48,
            123,
            211,
            142,
            207,
            51,
            14,
            104,
            250,
            78,
            75,
            164,
            73,
            139,
            4,
            158,
            100,
            109,
            79,
            200,
            4,
            175,
            65,
            250,
            150,
            172,
            74,
            62,
            102,
            95,
            13
        ]
    } : undefined

    if(isLogin) 
        return paramsObject;
    else
        return new URLSearchParams(paramsObject);
}