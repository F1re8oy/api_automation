import addContext from 'mochawesome/addContext.js'
import supertest from 'supertest'
import { config } from '../../config.js'
import { expect, assert } from 'chai'
import getNestedValue from 'get-nested-value'
import { Validator } from 'jsonschema'
import { en_AU } from '@faker-js/faker'

export async function request(context, method, path, body = undefined, auth = true, asserts = {statusCode : 200},  host = undefined, customHeaders = undefined) {
    const requestST = host ? supertest(host) : supertest(config[global.env].host)

    const headers = customHeaders ? customHeaders : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(auth && {'Authorization': `Bearer ${config[global.env].token}`})
    }

    let response = null
    let responseBody

    switch (method) {
        case 'GET':
            response = await requestST.get(path).set(headers)
            responseBody = response.body

            await performAssertion(responseBody, asserts, context, method, path, headers, response)

            break
        case 'POST':
            response = await requestST.post(path).send(body).set(headers)
            responseBody = response.body

            await performAssertion(responseBody, asserts, context, method, path, headers, response, body)
     
            break
        case 'PATCH':
            response = await requestST.patch(path).send(body).set(headers)
            responseBody = response.body

            await performAssertion(responseBody, asserts, context, method, path, headers, response)

            break
        case 'DELETE':
            response = await requestST.delete(path).send(body).set(headers)
            responseBody = response.body

            await performAssertion(responseBody, asserts, context, method, path, headers, response, body)

            break
        case 'PUT':
            response = await requestST.put(path).send(body).set(headers)
            responseBody = response.body

            await performAssertion(responseBody, asserts, context, method, path, headers, response, body)

            break
        default:
            console.log('not valid request method provided')
    }

    return response
}

async function validateStatusCode(actual, expected, context, method, path, headers, response, requestBody) {
        expect(actual).to.be.equal(expected)
}

async function validateFieldsExists(body, fields, context, method, path, headers, response, requestBody) {
    fields.every(field => {
        try {
            expect(getNestedValue(field, body), `${field} present in body`).not.to.be.undefined
        } catch (error) {
            addRequestInfoToReport(context, method, path, headers, response, requestBody)
            assert.fail(error.actual, error.expected, `${field} field is not present in body`)
        }
    })
}

async function validateExpectedValues(body, fields, context, method, path, headers, response, requestBody) {
    let errors = []
    fields.forEach(field => {
        try {
            if (field.value !== undefined){
                expect(getNestedValue(field.path, body), `${field.path} not equal to ${field.value}`).to.be.equal(field.value)
            } else {
                expect(getNestedValue(field.path, body), `${field.path} not contains ${field.valueContains}`).to.contain(field.valueContains)
            }
        } catch (error) {
            errors.push(error.message)
        }
    })

    return errors
}

async function validateExpectedTypes(body, fields, context, method, path, headers, response, requestBody) {
    fields.forEach(field => {
        try {
            expect(getNestedValue(field.path, body), `${field.path} data type is not ${field.type}`).to.be.a(field.type)
        } catch (error) {
            addRequestInfoToReport(context, method, path, headers, response, requestBody)
            const actual = getNestedValue(field.path, body)
            assert.fail(actual, field.type, `${actual} data type is not ${field.type}`)
        }
    })
}

async function validateExpectedTypesInsideArray(body, fields, context, method, path, headers, response, requestBody) {
    for (const obj of body) {
        await validateExpectedTypes(obj, fields, context, method, path, headers, response, requestBody)
    }
}

async function validateSchema(body, schema, context, method, path, headers, response, requestBody) {
    const validator = new Validator()
    const validationResults = validator.validate(body, schema)
    const isSchemaValid = validationResults.errors.length == 0 ? true : false

    if(!isSchemaValid) {
        console.log(validationResults.errors)
        for (const validationError of validationResults.errors) {
            assert.Fail(validationError.stack)
        }
    }
}

async function setExecutionVariables(body, variables) {
    variables.forEach(variable => {
        global.executionVariables[variable.name] = getNestedValue(variable.path, body)
    })
}

async function performAssertion(
    responseBody, 
    asserts, 
    context, 
    method, 
    path, 
    headers, 
    response, 
    body = undefined
) {
    let errors = []
    await validateStatusCode(response.statusCode, asserts.statusCode, context, method, path, headers, response, body).catch(error => errors.push(error.message))

    if (asserts.expectedFields) {
       const expectedValuesErrors =  await validateFieldsExists(responseBody, asserts.expectedFields, context, method, path, headers, response, body)

       errors = [...errors, ...expectedValuesErrors]
    }

    if (asserts.expectedValues) {
        await validateExpectedValues(responseBody, asserts.expectedValues, context, method, path, headers, response, body)
    }

    if (asserts.executionVariables) {
        await setExecutionVariables(responseBody, asserts.executionVariables)
    }

    if (await asserts.expectedTypes) {
        await validateExpectedTypes(responseBody, asserts.expectedTypes, context, method, path, headers, response, body)
    }

    if (asserts.schema) {
        await validateSchema(responseBody, asserts.schema, context, method, path, headers, response, body)
    }

    if(asserts.validateExpectedTypesInsideArray) {
        await validateExpectedTypesInsideArray(responseBody, asserts.validateExpectedTypesInsideArray, context, method, path, headers, response, body)
    }

    addRequestInfoToReport(context, method, path, headers, response, body)

    if(errors.lenght > 0) {
        throw new Error(`Assertion failures: ${errors.join('\n')}`)
    }
}

function addRequestInfoToReport(context, method, path, headers, response, body) {
    addContext(context, `${method} ${path}`)
    addContext(context, {
        title: 'REQUEST HEADERS',
        value: headers
    })
    if (body) {
        addContext(context, {
            title: 'REQUEST BODY',
            value: body
        })
    }
    addContext(context, {
        title: 'RESPONSE HEADERS',
        value: response.headers
    })
    addContext(context, {
        title: 'RESPONSE BODY',
        value: response.body
    })
}