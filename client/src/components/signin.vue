<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        flat
        dark
      >
        Signin
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Signin
        </v-card-title>

        <v-card-text>
          <v-alert
            :value="redAlert"
            type="error"
            >
            {{ errorMessage }}
          </v-alert>
          <v-form @submit.prevent="signin">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="eye ? 'visibility_off' : 'visibility'"
              label="Password"
              :type="eye ? 'text' : 'password'"
              @click:append="eye = !eye"
              required
            ></v-text-field>
            <v-btn flat type="submit" large>Signin</v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import server from '@/api/server'

export default {
  name: 'signin',
  data () {
    return {
      email: '',
      password: '',
      redAlert: false,
      greenAlert: false,
      errorMessage: '',
      dialog: false,
      eye: false
    }
  },
  methods: {
    signin () {
      let data = {
        email: this.email,
        password: this.password
      }
      server
        .post('users/login', data)
        .then(({data}) => {
          data.isLogin = true
          localStorage.setItem('token', data.token)
          this.$store.dispatch('setUser', data)
          this.dialog = false
        })
        .catch(err => {
          this.redAlert = true
          this.errorMessage = err.response.data.msg
        })
    }
  }
}
</script>

<style>

</style>
