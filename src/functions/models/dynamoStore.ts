import { IMailGunIncomingData } from '@functions/mailGunCallback/schema';
import {StoreInterface} from '@functions/interfaces/IStoreInterface'
import { DynamoDB } from 'aws-sdk' 

class DynamoStore implements StoreInterface{

     Save(data: IMailGunIncomingData): Promise<boolean> {
        console.log (`mongo data is ${data}`)
        const docClient = new DynamoDB.DocumentClient({region : 'us-west-2'});

        return docClient.put({Item:data, TableName: process.env.DYNAMO_TABLE}).promise().then(() => {
            console.log(`passed 1`)
            return true
        }).catch((err) =>{
            console.log(err)
            return false
        })
        
    }

}

export const dynamoStore = new DynamoStore()