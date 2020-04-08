import storeConfig from '@/store/store-config'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(storeConfig)

test('returns a list of completed tasks', () => {
  store.commit('addItem', 'test task')
  expect(store.state.todos).toHaveLength(1)

  store.commit('toggleCompletion', store.state.todos[0].id)
  expect(store.getters.completedList).toHaveLength(1)
})
