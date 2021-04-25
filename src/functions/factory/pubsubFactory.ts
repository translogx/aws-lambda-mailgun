import {PublishInterface} from '@functions/interfaces/IPublishinterface'
import {snsPublish} from '@functions/models/snsPublish'

export class PublisherFactory{
    private storeType: string //Stores

    constructor(storeName : string){
        this.storeType = storeName;
    }

    public getPublisher() : PublishInterface {

        switch(this.storeType){
            case 'SNS':
                return snsPublish
            default:
                return null

        }
        
    }
}
