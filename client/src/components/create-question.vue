<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        flat
      >
        Ask Question
      </v-btn>

      <v-card>
        <v-card-title
          class="headline orange lighten-2"
          primary-title
        >
          Question
        </v-card-title>

        <v-card-text>
          <v-alert
            :value="redAlert"
            type="error"
            >
            {{ errorMessage }}
          </v-alert>
          <v-form @submit.prevent="askQuestion">
            <v-text-field
              v-model="title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="body"
              label="Body"
              required
            ></v-textarea>
            <v-btn flat type="submit" large>Ask</v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import server from '@/api/server'

export default {
  name: 'ask',
  data () {
    return {
      dialog: false,
      title: '',
      body: '',
      redAlert: false,
      errorMessage: ''
    }
  },
  methods: {
    askQuestion () {
      server
        .get('/token/',
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(data => {
          this.redAlert = false
          if(this.title.length < 1 || this.body.length < 1) {
            this.redAlert = true
            this.errorMessage = 'Field cannot be empty'
          } else {
            firebase.firestore().collection('Question').add({
              owner: this.email,
              title: this.title,
              body: this.body,
              downVote: 0,
              upVote: 0,
              votersUp: [],
              votersDown: [],
              date: new Date() 
            })
            .then(docRef => {
              this.title = '',
              this.body = ''
              this.dialog = false
            })
            .catch(err => {
              console.log(err)
            })
          }
        })
    }
  },
  computed: mapState({
    email: 'email'
  })
}
</script>

<style>

</style>
