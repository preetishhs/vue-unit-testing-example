<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
  background: linear-gradient(to right bottom, #42b883 25%, #35495e 75%);
}

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #15171a;
    &.router-link-exact-active {
      color: #f2fdf8;
    }
  }
}
</style>
