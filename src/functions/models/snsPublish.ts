import {PublishInterface} from '@functions/interfaces/IPublishinterface'
import { IMailGunIncomingData } from '@functions/mailGunCallback/schema'

import {SNS} from 'aws-sdk'

class SNSPublish implements PublishInterface{

    async publish(data: IMailGunIncomingData): Promise<string> {
        try{
            const doSnsPub = new SNS({region : 'us-west-2'});

            const msg : object ={
                provider : "mailgun",
                timestamp: data.signature.timestamp,
                type : data['event-data'].event
            }

            const param : SNS.PublishInput= {
                MessageStructure : 'json',
                Message : JSON.stringify(msg),
                TopicArn : process.env.TOPIC_ARN
            }
        
            const result = await doSnsPub.publish(param).promise();
            if (result.MessageId !== null || result.MessageId !== undefined){
                
                return result.MessageId
            }else{
                return null
            }
        } catch (error) {
            
        }
        throw new Error('Method not implemented.')
    }
    
}

export const snsPublish = new SNSPublish()
