import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import { mongoStore} from '@functions/models/mongoStore'
import { s3Store} from '@functions/models/s3Store'
import { dynamoStore} from '@functions/models/dynamoStore'
import {Stores} from './storeNames'

export class StoreFactory{
    private storeType: string //Stores

    constructor(storeName : string){
        this.storeType = storeName;
    }

    public getStore() : StoreInterface {

        switch(this.storeType){
            case 'MONGO':
                return mongoStore
                
            case 'S3':
                return s3Store

            case 'DYNAMODB':
                return dynamoStore

            default:
                return null

        }
        
    }
}
