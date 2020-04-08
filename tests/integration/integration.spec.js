import { cleanup, render, fireEvent } from '@testing-library/vue'
import storeConfig from '@/store/store-config'
import Todos from '@/components/Todos.vue'
import { cloneDeep } from 'lodash'
import axios from 'axios'
jest.mock('axios')

afterEach(() => {
  cleanup()
})

const renderCounter = async (value = 'do something') => {
  const utils = render(Todos, { store: cloneDeep(storeConfig) })
  const input = utils.getByPlaceholderText('Add an item')
  await fireEvent.change(input, { target: { value: value } })
  await fireEvent.keyUp(input, { key: 'Enter', code: 13 })
  return utils
}

test('Check if item renders', async () => {
  const { getByText } = await renderCounter()
  expect(getByText('do something'))
})

test('Click on the item to check it', async () => {
  const { getByText } = await renderCounter()
  const item = getByText('do something')
  await fireEvent.click(item)
  expect(document.body.querySelector('.completed')).toBeTruthy()
})

test('remove an item', async () => {
  const { getByText } = await renderCounter()
  let item = getByText('do something')
  await fireEvent.click(item)
  document.querySelector('.destroy').click()
  expect(getByText('do something')).toBeTruthy()
})

test('Add an item asynchronously', async () => {
  const { getByText } = await renderCounter()
  let item = getByText('Async Add', { exact: false })
  let response = {
    data: {
      title: 'async text title'
    }
  }
  axios.get.mockResolvedValue(response)
  await fireEvent.click(item)
  expect(getByText('async text title'))
})

test('Add item with only spaces', async () => {
  await renderCounter('    ')
  let item = document.body.querySelector('li.todo')
  expect(item).not.toBeTruthy()
})

test('complete and uncomplete the task', async () => {
  const { getByText } = await renderCounter()
  const item = getByText('do something')
  await fireEvent.click(item)
  await fireEvent.click(item)
  expect(document.body.querySelector('.completed')).not.toBeTruthy()
})
