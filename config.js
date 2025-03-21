export const config = {
    STG: {
        host: 'https://gorest.co.in/public/v2',
        token: 'ecccb9ce4fb15faec3dc36b87ff8ffe282bf16133f592dc4b064f8dc39ebcc44',
        username: 'Tenali Ramakrishna',
        gender: 'male',
        status: 'active'
    },
    PROD: {
        host: 'https://gorest.co.in/public/v2',
        token: 'ecccb9ce4fb15faec3dc36b87ff8ffe282bf16133f592dc4b064f8dc39ebcc44',
        username: 'Tenali Ramakrishna',
        gender: 'male',
        status: 'active'
    },
    BOOKS_DEV: {
        host: 'http://localhost:1050',
    },
    BOOKS_STG: {
        host: 'http://localhost:2050',
    },
    BOOKS_PRD: {
        host: 'http://localhost:3050',
    }
}


global.executionVariables = {}