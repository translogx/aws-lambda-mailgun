import { IMailGunIncomingData } from '@functions/mailGunCallback/schema';
import {StoreInterface} from '@functions/interfaces/IStoreInterface'

class S3Store implements StoreInterface{
    
    Save(data: IMailGunIncomingData): Promise<boolean> {
        console.log (`s3 data is ${data}`)
        return
    }
    
}

export const s3Store = new S3Store()