import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.mailGunEventCallbackHandler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'mailgun-callback-handler',
        cors: true, 
      }
    }
  ]
}
