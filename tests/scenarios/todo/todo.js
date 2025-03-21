import { createUser, deleteUser } from '../../steps/user/user.js'
import { createTodo, deleteTodo, getTodo, updateTodo, createTodoWithWrongStatus, getAllUserTodos } from '../../steps/todo/todo.js'
import { generateTestData } from '../../utils/helpers.js'

before(async () => {
    await generateTestData()
    await createUser()
    // console.log('before hook')
})

after(async () => {
    await deleteUser()
})

describe('Todos', () => {
    describe(`CRUD Pending todos`, () => {
        createTodo('pending')
        getTodo()
        updateTodo('completed')
        getTodo()
        getAllUserTodos()
        deleteTodo()
    })

    describe.skip(`CRUD Completed todos`, () => {
        createTodo('completed')
        getTodo()
        updateTodo('pending')
        getTodo()
        deleteTodo()
    })

    describe.skip(`Todo negative`, () => {
        createTodoWithWrongStatus('notValid')
    })
})
