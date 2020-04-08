import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import axios from 'axios'
jest.mock('axios')

let state
beforeEach(() => {
  state = {
    todos: [
      { id: 1, title: 'test1', completed: false },
      { id: 2, title: 'test2', completed: true },
      { id: 3, title: 'test3', completed: false }
    ]
  }
})
describe('check getters', () => {
  test('returns the list of tasks marked complete', () => {
    const result = getters.completedList(state)
    expect(result).toHaveLength(1)
  })
})

describe('check mutations', () => {
  test('adds new item to the todo list', () => {
    const mock = { id: 123, title: 'test123', completed: false }
    mutations.addItem(state, mock)
    expect(state.todos).toHaveLength(4)
  })

  test('toggles the completed state of the task', () => {
    mutations.toggleCompletion(state, 1)
    expect(state.todos[0].completed).toBe(true)
  })

  test('removeItem removes an item from the list, length test', () => {
    mutations.removeItem(state, 1)
    expect(state.todos).toHaveLength(2)
  })
  test('removeItem removes an item from the list, test by verifying the list', () => {
    const item = state.todos[0]
    mutations.removeItem(state, 0)
    expect(state.todos.includes(item)).toBe(false)
  })
})

describe('check Actions', () => {
  test('completeItem toggles the completion state of the task', () => {
    const context = {
      commit: jest.fn()
    }
    actions.completeItem(context, state.todos[0].id)
    expect(context.commit).toHaveBeenCalledWith(
      'toggleCompletion',
      state.todos[0].id
    )
  })

  test('Adds a new item from web by making an API call', async () => {
    const context = {
      commit: jest.fn()
    }
    let response = {
      data: {
        title: 'test title'
      }
    }
    axios.get.mockResolvedValue(response)
    await actions.addItemFromWeb(context)
    expect(context.commit).toHaveBeenCalledWith('addItem', response.data.title)
  })
})
