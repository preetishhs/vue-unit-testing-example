//getters.js
export default {
  completedList(state) {
    return state.todos.filter(tasks => tasks.completed === true)
  }
}
