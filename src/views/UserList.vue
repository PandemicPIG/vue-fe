<template>
  <div class="user-list">
    <div
      v-for="user in users"
      :key="user.userId"
      class="user"
      @click="selectUser(user.userId)">
      <div>
        {{ user.name }}
      </div>
      <div>
        {{ user.email }}
      </div>
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
  .user {
    cursor: pointer;
    display: flex;
    max-width: 500px;
    justify-content: space-between;
    padding: .5em;
    border-bottom: 1px solid #e5e5e5;
  }

  .user:last-child {
    border: none;
  }

  .user:hover {
    background-color: #e5e5e5;
  }
</style>
