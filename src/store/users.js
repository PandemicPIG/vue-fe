import Vue from 'vue'
const namespace = 'users'
const types = {
  SET: `${namespace}:SET`,
  UPDATE: `${namespace}:UPDATE`,
  REMOVE: `${namespace}:REMOVE`,
  SET_EDITED: `${namespace}:SET_EDITED`,
  REMOVE_EDITED: `${namespace}:REMOVE_EDITED`,
  SET_ERROR: `${namespace}:SET_ERROR`,
  SET_SUCCESS: `${namespace}:SET_SUCCESS`,
  EMPTY: `${namespace}/empty`,
  ERROR: `${namespace}/error`,
  SUCCESS: `${namespace}/success`,
  EDITED: `${namespace}/edited`,
  USER_EXISTS: `${namespace}/userExists`,
  VALID_EMAIL: `${namespace}/validEmail`,
  VALID_NAME: `${namespace}/validName`,
  EMAIL_ERROR_MESSAGE: `${namespace}/emailErrorMessage`
}

const state = {
  data: [],
  edited: {},
  error: null,
  success: null
}

const getters = {
  [namespace]: () => state.data.sort((a, b) => a.userId - b.userId),
  [types.USER_EXISTS]: () => user => {
    return user.email && state.data.find(u => u.email === user.email.toLowerCase() && u.userId !== user.userId)
  },
  [types.VALID_EMAIL]: (_, getters) => user => {
    return user.email && user.email.length > 4 && !getters[types.USER_EXISTS](user)
  },
  [types.VALID_NAME]: () => name => name && name.length > 1,
  [types.EMAIL_ERROR_MESSAGE]: (_, getters) => user => {
    return getters[types.USER_EXISTS](user) ? 'User already exists for email' : 'Invalid email'
  },
  [types.EDITED]: () => state.edited,
  [types.EMPTY]: () => !state.data.length,
  [types.ERROR]: () => state.error,
  [types.SUCCESS]: () => state.success
}

const actions = {
  getUsers ({ commit }) {
    fetch('http://localhost:8081/api').then(res => {
      if (res.status !== 200) {
        throw new Error('Server error')
      } else {
        return res.json()
      }
    }).then(json => {
      commit(types.SET, json.data)
    }).catch(e => {
      commit(types.SET_ERROR, e.message)
      throw e
    })
  },
  createUser ({ commit, dispatch }, user) {
    commit(types.UPDATE, { user, pending: true })
    fetch('http://localhost:8081/api', {
      method: 'POST',
      body: JSON.stringify(user)
    }).then(res => {
      if (res.status !== 201) {
        return res.json().then(err => {
          throw new Error(err.message)
        })
      } else {
        commit(types.SET_SUCCESS, 'User added succesfully')
        dispatch('getUsers')
      }
    }).catch(e => {
      commit(types.REMOVE, user)
      commit(types.SET_ERROR, e.message)
      throw e
    })
  },
  updateUser ({ commit, dispatch, getters }, user) {
    const oldUser = getters.users.find(u => u.userId === user.userId)
    commit(types.UPDATE, { user, pending: true })

    fetch('http://localhost:8081/api', {
      method: 'PATCH',
      body: JSON.stringify(user)
    }).then(res => {
      if (res.status !== 200) {
        return res.json().then(err => {
          throw new Error(err.message)
        })
      } else {
        commit(types.REMOVE_EDITED, user.userId)
        commit(types.SET_SUCCESS, 'User updated succesfully')
        dispatch('getUsers')
      }
    }).catch(e => {
      commit(types.UPDATE, { user: oldUser })
      commit(types.SET_ERROR, e.message)
      throw e
    })
  },
  deleteUser ({ commit, dispatch, getters }, userId) {
    const oldUser = getters.users.find(u => u.userId === userId)
    commit(types.REMOVE, { userId })

    fetch('http://localhost:8081/api', {
      method: 'DELETE',
      body: JSON.stringify({ userId })
    }).then(res => {
      if (res.status !== 200) {
        return res.json().then(err => {
          throw new Error(err.message)
        })
      } else {
        commit(types.SET_SUCCESS, 'User deleted succesfully')
      }
    }).catch(e => {
      commit(types.UPDATE, { user: oldUser })
      commit(types.SET_ERROR, e.message)
      throw e
    })
  },
  updateEditedUsers ({ commit }, data) {
    commit(types.SET_EDITED, data)
  },
  removeError ({ commit }) {
    commit(types.SET_ERROR, null)
  },
  removeSuccess ({ commit }) {
    commit(types.SET_SUCCESS, null)
  }
}

const mutations = {
  [types.SET] (state, data) {
    state.data = [...Object.values(data)]
  },
  [types.UPDATE] (state, { user, pending }) {
    state.data = [
      ...state.data.filter(u => u.userId !== user.userId),
      {
        ...user,
        pending
      }
    ]
  },
  [types.REMOVE] (state, user) {
    if (user.userId) {
      state.data = [...state.data.filter(u => u.userId !== user.userId)]
    } else {
      state.data = [...state.data.filter(u => u.email !== user.email)]
    }
  },
  [types.SET_EDITED] (state, data) {
    Vue.set(state, 'edited', {
      ...state.edited,
      [data.key]: data.value
    })
  },
  [types.REMOVE_EDITED] (state, id) {
    delete state.edited[`Name${id}`]
    delete state.edited[`Email${id}`]
  },
  [types.SET_ERROR] (state, message) {
    Vue.set(state, 'error', message)
  },
  [types.SET_SUCCESS] (state, message) {
    Vue.set(state, 'success', message)
  }
}

export default {
  state,
  getters,
  actions,
  types,
  mutations
}
