<template>
  <div id="app">
    <div
      :class="{
          pending,
          error
        }"
      class="status-indicator"></div>
    <router-view name="uedit" />
    <router-view name="ulist" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      pending: 'users/pending',
      error: 'users/error'
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #304050;
}

.status-indicator {
  position: fixed;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
}

.status-indicator.pending {
  background-color: orange;
}

.status-indicator.error {
  background-color: red;
}

button {
  cursor: pointer;
}
</style>
