import {
  type APIGatewayEvent,
  type APIGatewayProxyHandler,
  type APIGatewayProxyResult,
  type Context
} from 'aws-lambda'

import AWS from 'aws-sdk'

const STACK_NAME = process.env.STACK_NAME
if (STACK_NAME == null) {
  throw new Error('STACK_NAME is not defined.')
}
function getSsmKey (params: string[]): string {
  return '/' + [STACK_NAME, ...params].join('/')
}
const ssm = new AWS.SSM()

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const keys = event.queryStringParameters?.keys?.split(',') ?? []

  const keyValueSet = await Promise.all(keys.map(async (key) => {
    const result = await ssm.getParameter({
      Name: getSsmKey([key])
    }).promise()
    return {
      key,
      value: result.Parameter?.Value ?? null
    }
  }))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world❤️',
      event,
      context,
      keyValueSet
    })
  }
}
