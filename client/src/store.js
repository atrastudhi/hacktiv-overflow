import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    email: '',
    question: []
  },
  mutations: {
    setUser (state, payload) {
      state.isLogin = payload.isLogin
      state.email = payload.email
    },
    setQuestion (state, payload) {
      state.question = payload
    }
  },
  actions: {
    setUser ({commit}, payload) {
      commit('setUser', payload)
    },
    setQuestion({commit}) {
      firebase.firestore().collection('Question').orderBy('date', 'desc').onSnapshot(({docs}) => {
        let temp = []
        docs.forEach(e => {
          let object = e.data()
          object.id = e.id
          object.date = moment(object.date).format("LLL"); 
          temp.push(object)
        });
        commit('setQuestion', temp)
      })
    }
  }
})
