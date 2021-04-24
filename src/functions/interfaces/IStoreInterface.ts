import {IMailGunIncomingData} from '@functions/mailGunCallback/schema'
export interface StoreInterface {
    Save( data: IMailGunIncomingData ): Promise<boolean>
}