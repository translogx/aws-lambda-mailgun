import { IMailGunIncomingData } from '@functions/mailGunCallback/schema';
import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import { DynamoDB } from 'aws-sdk' 
import { responseInterface } from '../interfaces/IResponseInterface';
import { v4 as uuidv4 } from 'uuid'

class DynamoStore implements StoreInterface{

     async save(data: IMailGunIncomingData): Promise<responseInterface> {
         
        const docClient = new DynamoDB.DocumentClient({region : 'us-west-2'});
        const dataTopersist = {
            id : uuidv4(),
            mailgunEventOject: data
        }

        try {
             await docClient.put({ Item: dataTopersist, TableName: process.env.DYNAMO_TABLE }).promise();
             console.log(`passed 1`);
             return {
                 status: true,
                 msg : "success"
             };
         } catch (err) {
             console.log(err);
             return {
                 status: false,
                 msg : err.message
             };
         }
        
    }

}

export const dynamoStore = new DynamoStore()