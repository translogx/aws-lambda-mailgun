import {IMailGunIncomingData} from '@functions/mailGunCallback/schema'
export interface PublishInterface {
    
    publish( data: IMailGunIncomingData ): Promise<string>
}