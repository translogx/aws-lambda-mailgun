# Deployment Note

### steps
- Setup your storage (in this case a AWS Dynamo Db was used)
- Setup an AWS SNS topic to publish messages to
- Create an AWS Lambda function. (don't forget to provide the environment variables as in `.env.example` file)
- Create an AWS gateway method so it send's it's request to the lambda function created in the previous step
- Obtain a signing key from mailgun and update `MAILGUN_SIGN_KEY` in the environment variable accordingly
