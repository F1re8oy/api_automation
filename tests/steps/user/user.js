import { request } from '../../utils/requests.js'
import { getCreateUserRequestBody } from '../../utils/requestBodyGenerator/user.js'
import createUserSchema from '../../data/schema/user/createUserSchema.json' with { type: 'json' }

export function createUser() {
    it('Create user account', async function () {
        const requestBody = await getCreateUserRequestBody()        
        await request(this, 'POST', `/users`, requestBody, true, 
            {
                statusCode : 201,
                expectedValues: [
                                    {path: 'name', value: requestBody.name},
                                    {path: 'gender', value: requestBody.gender},
                                    {path: 'status', valueContains: 'acti'}
                                ],
                executionVariables: [
                                        {path: 'id', name: 'userId'},
                                        {path: 'name', name: 'userName'},
                                        {path: 'gender', name: 'userGender'},
                                        {path: 'status', name: 'userStatus'},
                                        {path: 'email', name: 'userEmail'},
                                    ],
                schema: createUserSchema
                
            }
        )
    })
}

export function deleteUser() {
    it('Delete user account', async function () {
        await request(this, 'DELETE', `/users/${global.executionVariables['userId']}`, undefined, true, 
            {
                statusCode : 204
            }
        )
    })
}

export function getUser() {
    it('Get user account', async function () {
        const requestBody = await getCreateUserRequestBody()
        await request(this, 'GET', `/users/${global.executionVariables['userId']}`, requestBody, true, 
            {
                statusCode : 200,
                expectedFields: ['email'],
                expectedValues: [
                                    {path: 'name', value: global.executionVariables['userName']},
                                    {path: 'gender', value: global.executionVariables['userGender']},
                                    {path: 'status', value: global.executionVariables['userStatus']},
                                    {path: 'email', value: global.executionVariables['userEmail']},
                                    {path: 'id', value: global.executionVariables['userId']}
                                ],

            }
        )
    })
}

export function updateUser() {
    it('Update user account', async function () {
        const requestBody = await getCreateUserRequestBody()
        await request(this, 'PATCH', `/users/${global.executionVariables['userId']}`, requestBody, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: 'name', value: requestBody.name},
                                    {path: 'gender', value: requestBody.gender},
                                    {path: 'status', value: requestBody.status},
                                    {path: 'email', value: requestBody.email}
                                ],
                executionVariables: [
                                        {path: 'email', name: 'userEmail'},
                                        {path: 'name', name: 'userName'},
                                    ]
            }
        )
    })
}

export function deleteAlreadyDeletedUser() {
    it('Delete alrady deleteduser account', async function () {
        await request(this, 'DELETE', `/users/${global.executionVariables['userId']}`, undefined, true, 
            {
                statusCode : 404,
                expectedValues: [{
                    path: 'message', value: 'Resource not found'
                }]
            }
        )
    })
}

export function createUserWithoutToken() {
    it('Create user without token', async function () {
        const requestBody = await getCreateUserRequestBody()
        await request(this, 'POST', `/users`, requestBody, false, 
            {
                statusCode : 401,
                expectedValues: [{
                    path: 'message', value: 'Authentication failed'
                }]
            }
        )
    })
}

export function updateUserWithoutToken() {
    it('Update user  without token', async function () {
        const requestBody = await getCreateUserRequestBody()
        await request(this, 'PATCH', `/users/${global.executionVariables['userId']}`, requestBody, false, 
            {
                statusCode : 404,
                expectedValues: [{
                    path: 'message', value: 'Resource not found'
                }]
            }
        )
    })
}