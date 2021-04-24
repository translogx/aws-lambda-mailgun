import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = {

  _200: (response: Record<string, unknown> ) => {
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  },
  
  _400: (response: Record<string, unknown> ) => {
    return {
      statusCode: 400,
      body: JSON.stringify(response)
    }
  },
}







// (response: Record<string, unknown>, resCode: ) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(response)
//   }
// }
