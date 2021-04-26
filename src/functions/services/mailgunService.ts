import {createHmac} from 'crypto'

class MailGunService {

   // validate data came from mailgun (based off documentation) 
    public validateData(signingKey : string, timestamp : string, token : string, signature : string  ): boolean {
        
        const encodedToken = createHmac('sha256', signingKey)
        .update(timestamp+token)
        .digest('hex')

        return (encodedToken === signature);
    }
}

export const mailGunService = new MailGunService();