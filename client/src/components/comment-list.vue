<template>
  <v-container>
    <v-alert
      :value="redAlert"
      type="error"
    >
      {{ errorMessage }}
    </v-alert>
    <div v-for="list in commentList" :key="list.id">
    <v-layout row justify-center>
        <div>
          <v-layout column text-xs-center>
            <v-btn icon @click="up(list)"><v-icon >arrow_upward</v-icon></v-btn>
            <h3 >{{ list.upVote.length - list.downVote.length }}</h3>
            <v-btn icon @click="down(list)"><v-icon >arrow_downward</v-icon></v-btn>
          </v-layout>
        </div>
        <div class="comment">
          <v-layout row>
            <p>{{ list.comment }}</p>
            <v-layout justify-end>
            <update :commentList="list"/>
            </v-layout>
          </v-layout>
          <hr>
          <small>{{ list.date }}</small>
          <h3>{{ list.owner }}</h3>
        </div>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import server from '@/api/server'
import update from '@/components/update-comment'
import {mapState} from 'vuex'
import moment from 'moment'

export default {
  name: 'comment',
  components: {
    update
  },
  data () {
    return {
      commentList: [],
      redAlert: false,
      errorMessage: ''
    }
  },
  methods: {
    up (answer) {
      server
      .get('token/', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        if(answer === this.email) {
          this.redAlert = true
          this.errorMessage = 'you cant vote your own comment'
          setTimeout(() => {
            this.redAlert = false
          }, 3000);
        } else {
          let check = true
          answer.upVote.forEach(e => {
            if(e === this.email) {
              check = false
            }
          });
          if(!check) {
            firebase.firestore().collection('Comment').doc(answer.id).update({
              upVote: firebase.firestore.FieldValue.arrayRemove(this.email)
            })
          } else {
            firebase.firestore().collection('Comment').doc(answer.id).update({
              upVote: firebase.firestore.FieldValue.arrayUnion(this.email)
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    down (answer) {
      server
      .get('token/', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        if(answer === this.email) {
          this.redAlert = true
          this.errorMessage = 'you cant vote your own comment'
          setTimeout(() => {
            this.redAlert = false
          }, 3000);
        } else {
          let check = true
          answer.downVote.forEach(e => {
            if(e === this.email) {
              check = false
            }
          });
          if(!check) {
            firebase.firestore().collection('Comment').doc(answer.id).update({
              downVote: firebase.firestore.FieldValue.arrayRemove(this.email)
            })
          } else {
            firebase.firestore().collection('Comment').doc(answer.id).update({
              downVote: firebase.firestore.FieldValue.arrayUnion(this.email)
            })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    firebase.firestore().collection('Comment').where('question', '==', this.$route.params.id).onSnapshot(({docs}) => {
      let temp = []
      docs.forEach(e => {
        let object = e.data()
        object.id = e.id
        object.date = moment(object.date).format("LLL"); 
        temp.push(object)
      });
      this.commentList = temp
    })
  },
  computed: mapState({
    email: 'email'
  })
}
</script>

<style>
  .comment {
    min-width: 50vw;
  }
  p {
    margin-bottom: 0px
  }
</style>
