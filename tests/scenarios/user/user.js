import { createUser, deleteUser, getUser, updateUser, deleteAlreadyDeletedUser, createUserWithoutToken, updateUserWithoutToken } from '../../steps/user/user.js'
import { generateTestData } from '../../utils/helpers.js'

before(async () => {
    await generateTestData()
    // console.log('before hook')
})

// after(async () => {
//     console.log('after hook')
// })

describe('User', () => {
    describe(`CRUD User`, () => {
        createUser()
        getUser()
        updateUser()
        getUser()
        deleteUser()
    })

    describe.skip(`Delete alrady deleted user`, () => {
        createUser()
        deleteUser()
        deleteAlreadyDeletedUser()
    })

    describe.skip(`Create user without token`, () => {
        createUserWithoutToken()
    })

    describe.skip(`Update user without token`, () => {
        createUser()
        updateUserWithoutToken()
        deleteUser()
    })
})
