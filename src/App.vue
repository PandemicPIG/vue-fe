<template>
  <div id="app">
    <router-view
      class="view"
      name="uedit" />
    <h1 class="title">Users added</h1>
    <router-view
      class="view"
      name="ulist" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #304050;
  /* TODO re-evaluate */
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fafafa;
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap; */
}

.view, .title {
  width: 90vw;
  max-width: 1125px;
  box-sizing: border-box;
}

.view {
  background-color: white;
  border-radius: 8px;
  padding: 3rem;
}

.mockup {
  width: 90vw;
}

button {
  cursor: pointer;
  width: 182px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid rgb(30, 191, 165);
  border-radius: 4px;
  color: rgb(30, 191, 165);
  font-size: 18px;
  font-weight: bold;
}

.action {
  color: #fff;
  background-color: rgb(30, 191, 165);
}

.disabled {
  color: rgb(176, 191, 197);
  border-color: rgb(176, 191, 197);
  background-color: #fff;
}

.action.disabled {
  color: #fff;
  background-color: rgb(176, 191, 197);
}
</style>
