<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        flat
        icon
      >
        <v-icon color="white">edit</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
          class="headline orange lighten-2"
          primary-title
        >
          Update Question
        </v-card-title>

        <v-card-text>
          <v-alert
            :value="redAlert"
            type="error"
            >
            {{ errorMessage }}
          </v-alert>
          <v-form @submit.prevent="updateQuestion">
            <v-text-field
              v-model="title"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="body"
              label="Body"
              required
            ></v-text-field>
            <v-btn flat type="submit" large>Update</v-btn>
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
  name: 'update-question',
  props: ['list'],
  data () {
    return {
      dialog: false,
      title: this.list.title,
      body: this.list.body,
      redAlert: false,
      errorMessage: ''
    }
  },
  methods: {
    updateQuestion () {
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
            firebase.firestore().collection('Question').doc(this.list.id).update({
              title: this.title,
              body: this.body
            })
            .then(docRef => {
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
