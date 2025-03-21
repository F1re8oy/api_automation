import {faker} from '@faker-js/faker';

export async function getCreateTodoRequestBody(status) {
    return {
        title: faker.book.title(), 
        status: status
    }
}