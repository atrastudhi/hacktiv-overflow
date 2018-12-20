<template>
  <v-container>
    <v-alert
      :value="redAlert"
      type="error"
    >
      {{ errorMessage }}
    </v-alert>
    <v-alert
      :value="greenAlert"
      type="success"
    >
      {{ successMessage }}.
    </v-alert>
    <v-layout row justify-center>
      <div>
        <v-layout column text-xs-center>
          <v-btn icon @click="up"><v-icon large>arrow_upward</v-icon></v-btn>
          <h3 >{{ calculateVote }}</h3>
          <v-btn icon @click="down"><v-icon large>arrow_downward</v-icon></v-btn>
        </v-layout>
      </div>
      <div class="question">
        <h1>{{ question.title }}</h1>
        <hr>
        <h4>{{ question.body }}</h4>
        <createcomment />
      </div>
    </v-layout>
    <comment />
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import server from '@/api/server'
import comment from '@/components/comment-list'
import createcomment from '@/components/add-comment'

export default {
  name: 'detailpage',
  components: {
    comment,
    createcomment
  },
  data () {
    return {
      question: {},
      redAlert: false,
      errorMessage: '',
      greenAlert: false,
      successMessage: ''
    }
  },
  methods: {
    setQuestion () {
      firebase.firestore().collection('Question').doc(this.$route.params.id).onSnapshot(docs => {
        this.question = docs.data()
      })
    },
    up () {
      if(this.question.owner === this.stateEmail) {
        this.redAlert = true
        this.errorMessage = 'cannot vote your own question sir'
        setTimeout(() => {
          this.redAlert = false
        }, 5000);
      } else {
        server
        .get('/token', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          let check = true
          this.question.votersUp.forEach(e => {
            if(e === this.stateEmail) {
              check = false
            }
          });
          if(!check) {
            firebase.firestore().collection('Question').doc(this.$route.params.id).update({
              upVote: this.question.upVote - 1,
              votersUp: firebase.firestore.FieldValue.arrayRemove(this.stateEmail)
            })
            .then(() => {
              this.greenAlert = true
              this.successMessage = 'Success unvote for this question'
              setTimeout(() => {
                this.greenAlert = false
              }, 5000);
            })
            .catch(err => {
              console.log(err)
            })
          } else {
            firebase.firestore().collection('Question').doc(this.$route.params.id).update({
              upVote: this.question.upVote + 1,
              votersUp: firebase.firestore.FieldValue.arrayUnion(this.stateEmail)
            })
            .then(() => {
              this.greenAlert = true
              this.successMessage = 'Success up vote for this question'
              setTimeout(() => {
                this.greenAlert = false
              }, 5000);
            })
            .catch(err => {
              console.log(err)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    down () {
      if(this.question.owner === this.stateEmail) {
        this.redAlert = true
        this.errorMessage = 'cannot vote your own question sir'
        setTimeout(() => {
          this.redAlert = false
        }, 5000);
      } else {
        server
        .get('/token', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          let check = true
          this.question.votersDown.forEach(e => {
            if(e === this.stateEmail) {
              check = false
            }
          });
          console.log(check, this.stateEmail)
          if(!check) {
            firebase.firestore().collection('Question').doc(this.$route.params.id).update({
              downVote: this.question.downVote - 1,
              votersDown: firebase.firestore.FieldValue.arrayRemove(this.stateEmail)
            })
            .then(() => {
              this.greenAlert = true
              this.successMessage = 'Success unvote for this question'
              setTimeout(() => {
                this.greenAlert = false
              }, 5000);
            })
            .catch(err => {
              console.log(err)
            })
          } else {
            firebase.firestore().collection('Question').doc(this.$route.params.id).update({
              downVote: this.question.downVote + 1,
              votersDown: firebase.firestore.FieldValue.arrayUnion(this.stateEmail)
            })
            .then(() => {
              this.greenAlert = true
              this.successMessage = 'Success down vote for this question'
              setTimeout(() => {
                this.greenAlert = false
              }, 5000);
            })
            .catch(err => {
              console.log(err)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
  },
  mounted () {
    this.setQuestion()
  },
  computed: {
    calculateVote () {
      return this.question.upVote - this.question.downVote
    },
    stateEmail () {
      return this.$store.state.email
    }
  }
}
</script>

<style>
  .question {
    min-width: 70vw;
  }
</style>
