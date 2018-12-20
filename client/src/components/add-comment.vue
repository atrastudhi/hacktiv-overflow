<template>
  <div class="text-xs-center" id="comment">
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
      Success comment.
    </v-alert>
    <form @submit.prevent="addComment">
      <v-layout row justify-center>
        <v-text-field v-model="comment" label="Comment Here" required></v-text-field>
        <button icon type="submit"><v-icon color="orange">send</v-icon></button>
      </v-layout>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'add-comment',
  data () {
    return {
      dialog: false,
      redAlert: false,
      greenAlert: false,
      errorMessage: '',
      comment: ''
    }
  },
  methods: {
    addComment () {
      let comment = this.comment.trim()
      if(comment.length < 1) {
        this.redAlert = true
        this.errorMessage = 'field cannot be empty'
        setTimeout(() => {
          this.redAlert = false
        }, 3000);
      } else {
        firebase.firestore().collection('Comment').add({
          owner: this.email,
          comment: comment,
          upVote: [],
          downVote: [],
          question: this.$route.params.id,
          date: new Date()
        })
        .then(() => {
          this.comment = ''
          this.greenAlert = true
          setTimeout(() => {
              this.greenAlert = false
          }, 3000);
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  computed: mapState({
    email: 'email'
  })
}
</script>

<style>
#comment {
  margin: 2vw;
}
button {
  margin-left: 1vw;
}
</style>
