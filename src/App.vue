<template>
  <div id="app">
    <div
      :class="{
          pending,
          error
        }"
      class="status-indicator"></div>
    <router-view name="ulist" />
    <router-view name="uedit" />
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: green;
}

.status-indicator.pending {
  background-color: orange;
}

.status-indicator.error {
  background-color: red;
}
</style>
