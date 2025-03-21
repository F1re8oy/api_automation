import { createUser, deleteUser } from '../../steps/user/user.js'
import { createUserPost, getUserPost, deleteUserPost } from '../../steps/customer/posts.js'
import { generateTestData } from '../../utils/helpers.js'

before(async () => {
    await generateTestData()
    await createUser()
})

after(async () => {
    await deleteUser()
})


describe('Posts', () => {
    describe(`CRUD Posts`, () => {
        createUserPost()
        getUserPost()
        deleteUserPost()
    })
})
