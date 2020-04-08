<template>
  <section>
    <h1>TO DO LIST</h1>
    <div class="todoapp">
      <header class="header">
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="Add an item"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todoList.length">
        <ul class="todo-list">
          <li
            v-for="(item, index) in todoList"
            class="todo"
            :key="item.id"
            :class="{ completed: item.completed }"
            @click="toggleState(item.id)"
          >
            <div class="view">
              <label> {{ item.title }}</label>
              <button class="destroy" @click.stop="removeTodo(index)"></button>
            </div>
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todoList.length">
        <div class="total">Items: {{ todoList.length }}</div>
        <button class="async-add" @click="addItemFromWeb">Async Add</button>
        <div class="completed-list">Completed: {{ completedList.length }}</div>
      </footer>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'todos',
  data() {
    return {}
  },

  computed: {
    ...mapGetters(['completedList']),
    ...mapState({
      todoList: state => state.todos
    })
  },

  methods: {
    ...mapMutations(['addItem', 'toggleCompletion', 'removeItem']),

    ...mapActions(['addItemFromWeb']),

    toggleState(index) {
      return this.toggleCompletion(index)
    },
    addTodo(event) {
      if (!event.target.value.trim()) {
        return
      }
      this.addItem(event.target.value)
      event.target.value = ''
    },
    removeTodo: function(index) {
      this.removeItem(index)
    }
  }
}
</script>

<style lang="scss" scoped>
button.destroy {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}

.todoapp {
  width: 90%;
  background: #fff;
  margin: 80px auto 40px auto;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #a5a5a5;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #a5a5a5;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #a5a5a5;
}

h1 {
  width: 100%;
  font-size: 60px;
  font-weight: 100;
  text-align: center;
  margin-top: 80px;
  color: #fff;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 16px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.view label {
  cursor: pointer;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #a5a5a5;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #53f5ac;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: '×';
}

.todo-list li:hover {
  background: #d7ffed;
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

footer {
  height: 40px;
  display: flex;
  border-top: 1px solid #ededed;
  background: #ededed;
  align-items: center;
  justify-content: space-around;
  font-size: 16px;
}
</style>
