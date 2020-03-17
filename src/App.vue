<template>
  <div id="app">
    <div class="banners">
      <div
        v-if="success"
        class="success-banner"
        @click="removeSuccess">
        {{ success }}
      </div>
      <div
        v-if="error"
        class="error-banner"
        @click="removeError">
        {{ error }}
      </div>
    </div>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      error: 'users/error',
      success: 'users/success'
    })
  },
  methods: {
    ...mapActions([
      'removeError',
      'removeSuccess'
    ])
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

button {
  cursor: pointer;
  min-width: 182px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid rgb(30, 191, 165);
  border-radius: 4px;
  color: rgb(30, 191, 165);
  font-size: 18px;
  font-weight: bold;
}

button:disabled {
  pointer-events: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #304050;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fafafa;
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

.banners {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.success-banner, .error-banner {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: .5em;
  text-align: center;
}

.success-banner:after, .error-banner:after {
  content: 'x';
  position: absolute;
  right: 1em;
  top: .5em;
}

.success-banner {
  background-color: rgb(30, 191, 30);
}

.error-banner {
  background-color: rgb(191, 30, 30);
}
</style>
