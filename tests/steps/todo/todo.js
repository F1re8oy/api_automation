import { request } from '../../utils/requests.js'
import { getCreateTodoRequestBody } from '../../utils/requestBodyGenerator/todo.js'
import createTodoSchema from '../../data/schema/todo/createTodoSchema.json' with { type: 'json' }

export function createTodo(status) {
    it('Create todo', async function () {
        const requestBody = await getCreateTodoRequestBody(status)
        await request(this, 'POST', `/users/${global.executionVariables['userId']}/todos`, requestBody, true, 
            {
                statusCode : 201,
                expectedValues: [
                                    {path: 'title', value: requestBody.title},
                                    {path: 'status', value: requestBody.status},
                                    {path: 'user_id', value: global.executionVariables['userId']},
                                    {path: 'due_on', value: null},
                                ],
                executionVariables: [
                                        {path: 'id', name: 'todoID'},
                                        {path: 'title', name: 'todoTitle'},
                                        {path: 'status', name: 'todoStatus'},
                                    ],
                schema: createTodoSchema
            }
        )
    })
}

export function deleteTodo() {
    it('Delete todo', async function () {
        await request(this, 'DELETE', `/todos/${global.executionVariables['todoID']}`, undefined, true, 
            {
                statusCode : 204
            }
        )
    })
}

export function getTodo(status) {
    it('Get todo', async function () {
        const requestBody = await getCreateTodoRequestBody(status)
        await request(this, 'GET', `/todos/${global.executionVariables['todoID']}`, requestBody, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: 'id', value: global.executionVariables['todoID']},
                                    {path: 'title', value: global.executionVariables['todoTitle']},
                                    {path: 'status', value: global.executionVariables['todoStatus']},
                                    {path: 'user_id', value: global.executionVariables['userId']},
                                ]
            }
        )
    })
}

export function updateTodo(status) {
    it('Update todo', async function () {
        const requestBody = await getCreateTodoRequestBody(status)
        await request(this, 'PATCH', `/todos/${global.executionVariables['todoID']}`, requestBody, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: 'title', value: requestBody.title},
                                    {path: 'status', value: requestBody.status},
                                    {path: 'user_id', value: global.executionVariables['userId']},
                                ],
                expectedTypes: [
                                    {path: 'id', type: 'number'},
                                ],
                executionVariables: [
                                         {path: 'title', name: 'todoTitle'},
                                         {path: 'status', name: 'todoStatus'},
                                    ]
            }
        )
    })
}

export function getAllUserTodos(status) {
    it('Get all user todos', async function () {
        const requestBody = await getCreateTodoRequestBody(status)
        await request(this, 'GET', `/users/${global.executionVariables['userID']}/todos`, requestBody, true, 
            {
                statusCode : 200,
                validateExpectedTypesInsideArray: [
                    {path: 'id', type: 'number'},
                    {path: 'title', type: 'string'},
                ]
            }
        )
    })
}

export function createTodoWithWrongStatus(status) {
    it('Create todo with wrong status', async function () {
        const requestBody = await getCreateTodoRequestBody(status)
        await request(this, 'POST', `/users/${global.executionVariables['userId']}/todos`, requestBody, true, 
            {
                statusCode : 422,
                expectedValues: [
                                    { path: '0.field', value: 'status' },
                                    { path: '0.message', value: "can't be blank, can be pending or completed" },
                                ]
            }
        )
    })
}