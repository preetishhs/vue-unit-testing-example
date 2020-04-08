import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Todos from '@/components/Todos.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

let store, state, getters, mutations, actions

beforeEach(() => {
  state = {
    todos: []
  }
  getters = {
    completedList: () => []
  }
  mutations = {
    addItem: jest.fn(),
    toggleCompletion: jest.fn(),
    removeItem: jest.fn()
  }
  actions = {
    addItemFromWeb: jest.fn()
  }
  store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
})

describe('todo UI checks', () => {
  test('Check if input box is present', () => {
    const wrapper = shallowMount(Todos, { store, localVue })
    expect(wrapper.contains('input.new-todo')).toBe(true)
  })

  test('check if one item is present', () => {
    store.state.todos = [{ id: 1, title: 'one item', completed: false }]
    const wrapper = shallowMount(Todos, { store, localVue })
    expect(wrapper.contains('li.todo')).toBe(true)
  })

  test('check if an item has been crossed', () => {
    store.state.todos = [{ id: 1, title: 'one item', completed: true }]
    const wrapper = shallowMount(Todos, { store, localVue })
    expect(wrapper.contains('li.completed')).toBe(true)
  })

  test('check if remove button is present', () => {
    store.state.todos = [{ id: 1, title: 'one item', completed: true }]
    const wrapper = shallowMount(Todos, { store, localVue })
    expect(wrapper.contains('button.destroy')).toBe(true)
  })
})

describe('vuex component level checks', () => {
  test('check if toggleCompletion mutation was called on click', () => {
    store.state.todos = [{ id: 1, title: 'one item', completed: true }]
    const wrapper = shallowMount(Todos, { store, localVue })
    wrapper.find('li.todo').trigger('click')
    expect(mutations.toggleCompletion).toHaveBeenCalled()
  })

  test('check if addItem was not called for empty value on keyboard enter', () => {
    const wrapper = shallowMount(Todos, { store, localVue })
    wrapper.find('input.new-todo').trigger('click')
    wrapper.find('input.new-todo').trigger('keyup.enter')
    expect(mutations.addItem).not.toHaveBeenCalled()
  })

  test('check if addItem was called for non empty value on keyboard enter', () => {
    const wrapper = shallowMount(Todos, { store, localVue })
    wrapper.find('input.new-todo').setValue('test')
    wrapper.find('input.new-todo').trigger('keyup.enter')
    expect(mutations.addItem).toHaveBeenCalled()
  })

  test('check if removeItem is called on clicking x button', () => {
    store.state.todos = [{ id: 1, title: 'one item', completed: false }]
    const wrapper = shallowMount(Todos, { store, localVue })
    wrapper.find('button.destroy').trigger('click')
    expect(mutations.removeItem).toHaveBeenCalled()
  })

  test('check if addItemFromWeb action was called on button click', () => {
    // for that button to be visible we need one entry
    store.state.todos = [{ id: 1, title: 'one item', completed: false }]
    const wrapper = shallowMount(Todos, { store, localVue })
    wrapper.find('button.async-add').trigger('click')
    expect(actions.addItemFromWeb).toHaveBeenCalled()
  })
})

describe('Todo snapshot checks', () => {
  test('check if input box renders correctly', () => {
    const wrapper = shallowMount(Todos, { store, localVue })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
