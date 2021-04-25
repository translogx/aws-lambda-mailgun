import 'source-map-support/register';

import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import {PublishInterface} from '@functions/interfaces/IPublishinterface'
import { StoreFactory } from '@functions/factory/storeFactory'
import { PublisherFactory } from '@functions/factory/pubsubFactory'
import {IMailGunIncomingData} from './schema';
import { createHmac } from 'crypto';


class Handler{
  public async mailGunEventCallbackHandler(event: APIGatewayEvent, context: Context ): Promise<APIGatewayProxyResult> {
    let msgID : string = ""
    try {
      // parsereques
      const body : any = event.body
      const request : IMailGunIncomingData  = body as IMailGunIncomingData//JSON.parse(body);
      
      if (!this.validateData(process.env.MAILGUN_SIGN_KEY,request.signature.timestamp, request.signature.token, request.signature.signature)){
        throw new Error("Invalid Event");
      }
  
      //store incoming event
      const store : StoreInterface = new StoreFactory(process.env.STORE).getStore()

      if (store === null || store === undefined){
        throw new Error(`Unknown store provided. please configure store ${process.env.STORE}`);
      }

      const dbres  = await store.save(request) 
      
      if ((dbres !== null || dbres !== null ) && dbres.status == true ){
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
        throw new Error(`failed to persist incoming request. Reason: ${dbres.msg}`);
      }
      
    } catch (error) {
      
      return formatJSONResponse._400(
        { 
          message: error.message, 
          message_id: msgID
        }
      )
    }

    
  }

  private validateData(signingKey : string, timestamp : string, token : string, signature : string  ): boolean {
             
    const encodedToken = createHmac('sha256', signingKey)
    .update(timestamp.concat(token))
    .digest('hex')

    return (encodedToken === signature);
}
}

const handlers = new Handler();
export const handler = middyfy(handlers.mailGunEventCallbackHandler)

