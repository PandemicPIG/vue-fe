<template>
  <div class="user-edit">
    <input type="text" v-model="name">
    <input type="text" v-model="email">
    <button
      type="button"
      @click="clear()">CLEAR</button>
    <button
      type="button"
      @click="saveUser()">SAVE</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserEdit',
  data () {
    return {
      emailInput: null,
      nameInput: null
    }
  },
  computed: {
    ...mapGetters({
      selected: 'users/selected'
    }),
    email: {
      get () {
        return this.emailInput || this.selected.email
      },
      set (value) {
        this.emailInput = value
      }
    },
    name: {
      get () {
        return this.nameInput || this.selected.name
      },
      set (value) {
        this.nameInput = value
      }
    }
  },
  methods: {
    ...mapActions([
      'getUsers',
      'selectUser',
      'createUser',
      'updateUser'
    ]),
    clear () {
      this.selectUser(null)
      this.emailInput = null
      this.nameInput = null
    },
    saveUser () {
      if (this.selected.userId) {
        // update
        this.updateUser({
          userId: this.selected.userId,
          ...(this.emailInput ? { email: this.emailInput } : {}),
          ...(this.nameInput ? { name: this.nameInput } : {})
        })
      } else {
        // create
        this.createUser({
          email: this.email,
          name: this.name
        })
      }
      this.clear()
    }
  }
}
</script>

<style scoped>
.user-edit {
  display: flex;
  max-width: 500px;
  justify-content: space-between;
  padding: .5em;
  background-color: #e5e5e5;
}

.user-edit * {
  font-size: .9rem;
  padding: .5em;
}
</style>
