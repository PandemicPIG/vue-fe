import Vue from 'vue'
const namespace = 'users'
const types = {
  SET: `${namespace}:SET`,
  UPDATE: `${namespace}:UPDATE`,
  REMOVE: `${namespace}:REMOVE`,
  SET_EDITED: `${namespace}:SET_EDITED`,
  REMOVE_EDITED: `${namespace}:REMOVE_EDITED`,
  EMPTY: `${namespace}/empty`,
  EDITED: `${namespace}/edited`,
  GET_USER_BY_EMAIL: `${namespace}/getUserByEmail`
}

const state = {
  data: [],
  edited: {},
  error: null
}

const getters = {
  [namespace]: () => state.data.sort((a, b) => a.userId - b.userId),
  [types.GET_USER_BY_EMAIL]: () => email => state.data.find(user => user.email === email),
  [types.EDITED]: () => state.edited,
  [types.EMPTY]: () => !state.data.length
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
      console.error(e)
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
        dispatch('getUsers')
      }
    }).catch(e => {
      commit(types.REMOVE, user)
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
        dispatch('getUsers')
      }
    }).catch(e => {
      commit(types.UPDATE, { user: oldUser })
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
        dispatch('getUsers')
      }
    }).catch(e => {
      commit(types.UPDATE, { user: oldUser })
      throw e
    })
  },
  updateEditedUsers ({ commit }, data) {
    commit(types.SET_EDITED, data)
  }
}

const mutations = {
  [types.SET] (state, array) {
    state.data = [...array]
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
  }
}

export default {
  state,
  getters,
  actions,
  types,
  mutations
}
