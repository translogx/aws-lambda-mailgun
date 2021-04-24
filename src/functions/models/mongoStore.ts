import { IMailGunIncomingData } from '@functions/mailGunCallback/schema';
import {StoreInterface} from '@functions/interfaces/IStoreInterface'

class MongoStore implements StoreInterface{

    Save(data: IMailGunIncomingData): Promise<boolean> {
        console.log (`mongo data is ${data}`)
        return
    }
    
}

export const mongoStore = new MongoStore()