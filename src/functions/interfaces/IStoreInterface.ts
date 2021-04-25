import {IMailGunIncomingData} from '@functions/mailGunCallback/schema'
import { responseInterface } from '@functions/interfaces/IResponseInterface';

export interface StoreInterface {
    save( data: IMailGunIncomingData ): Promise<responseInterface>
}