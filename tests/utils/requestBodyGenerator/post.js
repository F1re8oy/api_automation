import {faker} from '@faker-js/faker';

export async function getCreatePostRequestBody() {
    return {
        title: faker.book.title(),
        body: faker.lorem.sentence()
    }
}