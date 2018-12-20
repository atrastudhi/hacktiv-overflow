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
        <v-icon color="orange">edit</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
          class="headline orange lighten-2"
          primary-title
        >
          Update Comment
        </v-card-title>

        <v-card-text>
          <v-alert
            :value="redAlert"
            type="error"
            >
            {{ errorMessage }}
          </v-alert>
          <v-form @submit.prevent="updateComment">
            <v-text-field
              v-model="comment"
              label="Comment"
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

export default {
  name: 'update-comment',
  props: ['commentList'],
  data () {
    return {
      dialog: false,
      redAlert: false,
      errorMessage: '',
      comment: this.commentList.comment
    }
  },
  methods: {
    updateComment () {
      if(this.commentList.owner === this.email) {
        firebase.firestore().collection('Comment').doc(this.commentList.id).update({
          comment: this.comment
        })
        .then(() => {
          this.dialog = false
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        this.redAlert = true,
        this.errorMessage = 'This is not your comment!'
        setTimeout(() => {
          this.dialog = false
        }, 2000);
      }
    }
  },
  computed: mapState({
    email: 'email'
  })
}
</script>

<style>

</style>
