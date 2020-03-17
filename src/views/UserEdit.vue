<template>
  <div class="user-edit">
    <h1 class="title">Add a new user</h1>
    <FieldInput
      class="data"
      v-model="name"
      :validator="validName"
      placeholder="Name"
      errorMessage="Name must be at least 2 characters long"
    />
    <FieldInput
      class="data"
      v-model="email"
      :validator="() => validEmail({ email })"
      placeholder="Email"
      :errorMessage="emailInputErrorMessage({ email })"
    />
    <button
      class="action"
      type="button"
      :disabled="!(validName(name) && validUserEmail(email))"
      @click="saveUser()">Add user</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FieldInput from '@/components/FieldInput'

export default {
  name: 'UserEdit',
  components: {
    FieldInput
  },
  data () {
    return {
      name: undefined,
      email: undefined
    }
  },
  computed: {
    ...mapGetters({
      users: 'users',
      userExists: 'users/userExists',
      validEmail: 'users/validEmail',
      validName: 'users/validName',
      emailInputErrorMessage: 'users/emailErrorMessage'
    })
  },
  methods: {
    ...mapActions([
      'createUser'
    ]),
    validUserEmail (email) {
      return this.validEmail({ email })
    },
    saveUser () {
      this.createUser({
        email: this.email,
        name: this.name
      })

      this.name = undefined
      this.email = undefined
    }
  }
}
</script>

<style scoped>
.user-edit {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 5em;
  margin-bottom: 1.75em;
  border-radius: 10px;
}

.user-edit, .title, .data, .action {
  flex-shrink: 0;
}

.title {
  width: 100%;
}

button {
  margin-top: 1.5em;
}

.action {
  color: #fff;
  background-color: rgb(30, 191, 165);
}

.action:disabled {
  color: #fff;
  background-color: rgb(176, 191, 197);
  border-color: rgb(176, 191, 197);
}
</style>
