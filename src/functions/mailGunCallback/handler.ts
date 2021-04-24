import 'source-map-support/register';

// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda'
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import { StoreFactory } from '@functions/factory/storeFactory'
// import './config.json'
import {IMailGunIncomingData} from './schema';
import { Stores } from '@functions/factory/storeNames';


class Handler{
  public async mailGunEventCallbackHandler(event: APIGatewayEvent, context: Context ): Promise<APIGatewayProxyResult> {
    
    // parsereques
    const request : IMailGunIncomingData  = JSON.parse(event.body);

    //store incoming event
    const store : StoreInterface = new StoreFactory(process.env.STORE).getStore()
    
    if (await store.Save(request) == true ){
      return formatJSONResponse._200(
        { 
          message: `Hello world, store is ${process.env.STORE}`, 
          input: event 
        }
      )
    }else{
      return formatJSONResponse._400(
        { 
          message: `failed but, store is ${process.env.STORE}`, 
          input: event 
        }
      )
    }

    
  }
}

const handlers = new Handler();
export const handler = middyfy(handlers.mailGunEventCallbackHandler)

