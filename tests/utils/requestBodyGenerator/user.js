import accountRequestBody from '../../data/user/create_account.json' with { type: 'json' }
import { config } from '../../../config.js'
import {faker} from '@faker-js/faker';


export async function getCreateUserRequestBody() {
    accountRequestBody.name = faker.person.firstName()
    accountRequestBody.status = config[global.env].status
    accountRequestBody.gender = config[global.env].gender
    accountRequestBody.email = faker.internet.email()
    
    return accountRequestBody
}