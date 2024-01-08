'use strict'

import { expect } from 'chai'
import { lambdaHandler } from '../../app'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

const apiGatewayProxyEvent: APIGatewayProxyEvent = JSON.parse('{ "body": "{}" }')
const context: Context = JSON.parse('{}')
const callback = () => {}

describe('Tests index', function () {
  it('verifies successful response', async () => {
    const result = await lambdaHandler(apiGatewayProxyEvent, context, callback)

    if (result == null) throw new Error("result is null")

    expect(result).to.be.an('object')
    expect(result.statusCode).to.equal(200)
    expect(result.body).to.be.an('string')

    const response = JSON.parse(result.body)

    expect(response).to.be.an('object')
    expect(response.message).to.contain('hello')
  })
})
