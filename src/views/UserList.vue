<template>
  <div class="user-list">
    <div
      v-for="user in users"
      :key="user.userId"
      class="user">
      <small class="status">Pending</small>
      <div class="user-data">
        <FieldInput
          class="data"
          :value="edited[`Name${user.userId}`] || user.name"
          label="Name"
          errorMessage="Name must be at least 2 characters long"
          @input="v => updateUserInProgress(v, user, 'Name')"
        />
        <FieldInput
          class="data"
          :value="edited[`Email${user.userId}`] || user.email"
          label="Email"
          errorMessage="Invalid email"
          @input="v => updateUserInProgress(v, user, 'Email')"
        />
      </div>
      <div class="actions">
        <button
          type="button"
          @click="deleteUser(user.userId)">DELETE</button>
        <button
          class="action"
          type="button"
          @click="saveUpdatedUser(user.userId)">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FieldInput from '@/components/FieldInput'
export default {
  name: 'UserList',
  components: {
    FieldInput
  },
  data () {
    return {
      name: '',
      email: ''
    }
  },
  mounted () {
    this.getUsers()
  },
  computed: {
    ...mapGetters(['users']),
    ...mapGetters({
      edited: 'users/edited'
    })
  },
  methods: {
    ...mapActions([
      'getUsers',
      'selectUser',
      'updateUser',
      'deleteUser',
      'updateEditedUsers'
    ]),
    updateUserInProgress (input, user, identifier) {
      this.updateEditedUsers({
        key: `${identifier}${user.userId}`,
        value: input
      })
    },
    saveUpdatedUser (id) {
      this.updateUser({
        userId: id,
        ...(this.edited[`Name${id}`] ? {
          name: this.edited[`Name${id}`]
        } : {}),
        ...(this.edited[`Email${id}`] ? {
          email: this.edited[`Email${id}`]
        } : {})
      })
    }
  }
}
</script>

<style scoped>
.user-list {
padding: 0;
background: transparent;
}

.user {
  padding: 1.5em 3rem;
  margin-bottom: 2.5em;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.user-data {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.data {
  width: 49%;
}

.status {
  position: absolute;
  top: 0.625em;
  left: 1.25em;
  font-size: 0.75em;
}

.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

button {
  margin: 1.5em 0 0 1.5em;
}
</style>
