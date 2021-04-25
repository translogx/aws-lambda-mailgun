import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import {PublishInterface} from '@functions/interfaces/IPublishinterface'
import { StoreFactory } from '@functions/factory/storeFactory'
import { PublisherFactory } from '@functions/factory/pubsubFactory'
import {IMailGunIncomingData} from './schema';
import { Stores } from '@functions/factory/storeNames';


class Handler{
  public async mailGunEventCallbackHandler(event: APIGatewayEvent, context: Context ): Promise<APIGatewayProxyResult> {
    let msgID : string = ""
    try {
      // parsereques
      const request : IMailGunIncomingData  = JSON.parse(event.body);
  
      //store incoming event
      const store : StoreInterface = new StoreFactory(process.env.STORE).getStore()
      
      if (await store.save(request) == true ){
        const publisher : PublishInterface = new PublisherFactory(process.env.PUBLISHER).getPublisher()
  
        msgID = await publisher.publish(request)
  
        if (msgID !== null ){
          return formatJSONResponse._200(
            { 
              message: 'Message saved and published', 
              message_id: msgID 
            }
          )
        }else{
          throw new Error("failed to publish data");
          
        }
      }else{
        throw new Error("failed to save incoming request");
      }
      
    } catch (error) {
      
      return formatJSONResponse._400(
        { 
          message: error, 
          message_id: msgID 
        }
      )
    }

    
  }
}

const handlers = new Handler();
export const handler = middyfy(handlers.mailGunEventCallbackHandler)

