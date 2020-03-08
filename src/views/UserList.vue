<template>
  <div class="user-list">
    <div
      v-for="user in users"
      :key="user.userId"
      class="user"
      @click="selectUser(user.userId)">
      {{ user.name }} - {{ user.email }}
      <button
        type="button"
        @click="deleteUser(user.userId)">DELETE</button>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserList',
  data () {
    return {}
  },
  mounted () {
    this.getUsers()
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapActions([
      'getUsers',
      'selectUser',
      'deleteUser'
    ])
  }
}
</script>

<style scoped>

</style>
