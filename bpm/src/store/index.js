import Vue from 'vue'
import Vuex from 'vuex'
import bpmContent from './bpmContent'

Vue.use(Vuex)

// import issue from './issue'

const store = new Vuex.Store({
  modules: {
    bpmContent
  },
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 1
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.counter
    }
  }
})

export default store
