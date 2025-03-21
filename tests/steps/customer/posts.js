import { request } from '../../utils/requests.js'
import { getCreatePostRequestBody } from '../../utils/requestBodyGenerator/post.js'

export function createUserPost() {
    it('Create user posts', async function () {
        const requestBody = await getCreatePostRequestBody()
        await request(this, 'POST', `/users/${global.executionVariables['userId']}/posts`, requestBody, true, 
            {
                statusCode : 201,
                expectedValues: [
                                    {path: 'title', value: requestBody.title},
                                    {path: 'body', value: requestBody.body},
                                ],
                executionVariables: [
                                {path: 'id', name: 'postID'},
                                {path: 'title', name: 'postTitle'},
                                {path: 'body', name: 'postBody'},
                ],
            }
        )
    })
}

export function getUserPost() {
    it('Get post', async function () {
        const requestBody = await getCreatePostRequestBody()
        await request(this, 'GET', `/posts/${global.executionVariables['postID']}`, requestBody, true, 
            {
                statusCode : 200,
                expectedValues: [
                                    {path: 'id', value: global.executionVariables['postID']},
                                    {path: 'title', value: global.executionVariables['postTitle']},
                                    {path: 'body', value: global.executionVariables['postBody']},
                                    {path: 'user_id', value: global.executionVariables['userId']},
                                ]
            }
        )
    })
}

export function deleteUserPost() {
    it('Delete post', async function () {
        await request(this, 'DELETE', `/posts/${global.executionVariables['postID']}`, undefined, true, 
            {
                statusCode : 204
            }
        )
    })
}