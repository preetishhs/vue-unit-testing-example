import axios from 'axios'

export default {
  addItemFromWeb({ commit }) {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
      commit('addItem', response.data.title)
    })
  },
  completeItem({ commit }, payload) {
    commit('toggleCompletion', payload)
  }
}
