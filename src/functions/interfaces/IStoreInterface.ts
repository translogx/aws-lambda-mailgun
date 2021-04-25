import {IMailGunIncomingData} from '@functions/mailGunCallback/schema'
export interface StoreInterface {
    save( data: IMailGunIncomingData ): Promise<boolean>
}