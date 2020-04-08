var GLOBAL_ID = 1

export default {
  addItem(state, payload) {
    state.todos.push({ id: GLOBAL_ID++, title: payload, completed: false })
  },
  toggleCompletion(state, id) {
    state.todos.forEach(task => {
      if (task.id === id) task.completed = !task.completed
    })
  },
  removeItem(state, index) {
    state.todos.splice(index, 1)
  }
}
