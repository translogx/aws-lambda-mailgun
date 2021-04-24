export interface IMailGunIncomingData {
    signature: IMailGunSign
    "event-data" : IMailGunEventData
}

interface IMailGunSign{
    timestamp: string
    token: string
    signature: string
}

interface IMailGunEventData{
    event: string
    timestamp: string
    id: string
    "log-level" : string
    method : string
    envelop : {
        [key: string] :string
    }
    flags : {
        [key: string] :boolean
    }
    message : {
        headers : {
            [key: string] :string
        }
    }
    attachments : []
    recipients : [ string ] 
    size : number
    storage : {
        [key: string] :string
    }
    recipient : string
    "recipient-domain" : string
    campaigns: [string],
    tags: [ string ],
    "user-variables": {
        [key: string] :string
    }

    routes ?: [
        {
            expression : string
            id : string
            match : {
                [key: string] :string
            }
        }
    ]
    "delivery-status" ? :{
        tls ?: boolean
        "mx-host" ?: string
        code : number
        description : string
        "retry-seconds" ?: number
        "session-seconds" ? : number
        utf8 ?: boolean
        "attempt-no" ? : number
        message : string
        "certificate-verified" ?: boolean

    }
    severity? : string
    geolocation ?: {
        [key: string] :string
    }
    ip ?: string
    "client-info" ?: {
        [key: string] :string
    }
    reject ?: {
        [key: string] :string
    }

}




// {
//     “signature”:
//     {
//       "timestamp": "1529006854",
//       "token": "a8ce0edb2dd8301dee6c2405235584e45aa91d1e9f979f3de0",
//       "signature": "d2271d12299f6592d9d44cd9d250f0704e4674c30d79d07c47a66f95ce71cf55"
//     }
//     “event-data”:
//     {
//       "event": "opened",
//       "timestamp": 1529006854.329574,
//       "id": "DACSsAdVSeGpLid7TN03WA",
//       // ...
//     }
//   }