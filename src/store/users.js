import Vue from 'vue'
const namespace = 'users'
const types = {
  SET: `${namespace}:SET`,
  SET_SELECTED: `${namespace}:SET_SELECTED`,
  SET_EDITED: `${namespace}:SET_EDITED`,
  REMOVE_EDITED: `${namespace}:REMOVE_EDITED`,
  SET_PENDING: `${namespace}:SET_PENDING`,
  SET_SUCCESS: `${namespace}:SET_SUCCESS`,
  SET_FAILURE: `${namespace}:SET_FAILURE`,
  EMPTY: `${namespace}/empty`,
  ERROR: `${namespace}/error`,
  PENDING: `${namespace}/pending`,
  SELECTED: `${namespace}/selected`,
  EDITED: `${namespace}/edited`
}

const state = {
  data: [],
  selected: null,
  edited: {},
  pending: true,
  error: false
}

const getters = {
  [namespace]: () => state.data.sort((a, b) => a.userId - b.userId),
  [types.SELECTED]: () => state.data.find(a => a.userId === state.selected) || {},
  [types.EDITED]: () => state.edited,
  [types.EMPTY]: () => !state.data.length && !state.pending,
  [types.PENDING]: () => state.pending ? 'loading' : false,
  [types.ERROR]: () => state.error
}

const actions = {
  getUsers ({ commit }) {
    commit(types.SET_PENDING)
    fetch('http://localhost:8081/api').then(res => res.json()).then(json => {
      commit(types.SET, json.data)
      commit(types.SET_SUCCESS)
    }).catch(() => {
      commit(types.SET_FAILURE)
    })
  },
  selectUser ({ commit }, userId) {
    commit(types.SET_SELECTED, userId)
  },
  createUser ({ commit, dispatch }, user) {
    commit(types.SET_PENDING)
    fetch('http://localhost:8081/api', {
      method: 'POST',
      body: JSON.stringify(user)
    }).then(res => {
      commit(types.SET_SUCCESS)
      dispatch('getUsers')
    }).catch(() => {
      commit(types.SET_FAILURE)
    })
  },
  updateUser ({ commit, dispatch }, user) {
    commit(types.SET_PENDING)
    return fetch('http://localhost:8081/api', {
      method: 'PATCH',
      body: JSON.stringify(user)
    }).then(res => {
      commit(types.REMOVE_EDITED, user.userId)
      commit(types.SET_SUCCESS)
      dispatch('getUsers')
    }).catch(() => {
      commit(types.SET_FAILURE)
    })
  },
  deleteUser ({ commit, dispatch }, userId) {
    commit(types.SET_PENDING)
    fetch('http://localhost:8081/api', {
      method: 'DELETE',
      body: JSON.stringify({ userId })
    }).then(res => {
      commit(types.SET_SUCCESS)
      dispatch('getUsers')
    }).catch(() => {
      commit(types.SET_FAILURE)
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
  [types.SET_SELECTED] (state, id) {
    Vue.set(state, 'selected', id)
  },
  [types.SET_EDITED] (state, data) {
    // needs changing object reference for reactivity
    Vue.set(state, 'edited', {
      ...state.edited,
      [data.key]: data.value
    })
  },
  [types.REMOVE_EDITED] (state, id) {
    delete state.edited[`Name${id}`]
    delete state.edited[`Email${id}`]
  },
  [types.SET_PENDING] (state) {
    Vue.set(state, 'pending', true)
    Vue.set(state, 'error', false)
  },
  [types.SET_SUCCESS] (state) {
    Vue.set(state, 'pending', false)
    Vue.set(state, 'error', false)
  },
  [types.SET_FAILURE] (state) {
    Vue.set(state, 'pending', false)
    Vue.set(state, 'error', true)
  }
}

export default {
  state,
  getters,
  actions,
  types,
  mutations
}
