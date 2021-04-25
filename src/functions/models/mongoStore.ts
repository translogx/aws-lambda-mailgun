import { IMailGunIncomingData } from '@functions/mailGunCallback/schema';
import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import { responseInterface } from '../interfaces/IResponseInterface';

class MongoStore implements StoreInterface{

    save(data: IMailGunIncomingData): Promise<responseInterface> {
        console.log (`mongo data is ${data}`)
        return
    }
    
}

export const mongoStore = new MongoStore()