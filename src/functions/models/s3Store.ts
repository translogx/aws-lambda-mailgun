import { IMailGunIncomingData } from '@functions/mailGunCallback/schema';
import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import { responseInterface } from '../interfaces/IResponseInterface';

class S3Store implements StoreInterface{
    
    save(data: IMailGunIncomingData): Promise<responseInterface> {
        console.log (`s3 data is ${data}`)
        return
    }
    
}

export const s3Store = new S3Store()