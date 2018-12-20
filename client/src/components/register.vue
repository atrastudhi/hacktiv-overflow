<template>
  <v-container id="full">
    <v-layout row>
      <v-container>
        <h1>Learn, Share, Build</h1>
        <br>
        <p>Each month, over 50 milion developers come to Hacktiv Overflow to learn, share their knowledge, and build their careers.</p>
        <br>
        <p><strong> Join the world's largest developer community. </strong></p>
      </v-container>
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
          Success signup now you can signin.
        </v-alert>

        <v-layout row justify-center>
          <div id="google-signin-button"></div>
        </v-layout>

        <v-layout justify-center class="or">
        <small><strong>or</strong></small>
        </v-layout>
        <v-form @submit.prevent="signup">
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
          <v-layout row>
            <v-btn flat type="submit" large>Signup</v-btn>
            <small>By clicking "Sign Up", you acknowledge that you have read our updated terms of service, privacy policy and cookie policy, and that your continued use of the website is subject to these policies.</small>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import server from '@/api/server'

export default {
  name: 'register',
  data () {
    return {
      eye: false,
      email: '',
      password: '',
      errorMessage: '',
      redAlert: false,
      greenAlert: false
    }
  },
  methods: {
    signup () {
      this.redAlert = false
      let data = {
        email: this.email,
        password: this.password
      }
      server
        .post('users/', data)
        .then(user => {
          this.greenAlert = true
          this.email = ''
          this.password = ''
          setTimeout(() => {
            this.greenAlert = false
          }, 3000);
        })
        .catch(({response}) => {
          this.redAlert = true
          if(response.data.errors.email) {
            this.errorMessage = response.data.errors.email.message
            this.email = ''
          } else {
            this.errorMessage = response.data.errors.password.message
            this.password = ''
          }
          setTimeout(() => {
            this.redAlert = false
          }, 3000);
        })
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      server
      .post('/googleSignin/', {
        email: profile.getEmail()
      })
      .then(data => {
        server
        .post('/googleSignin/login', {
          email: profile.getEmail()
        })
        .then(({data}) => {
          data.isLogin = true
          localStorage.setItem('token', data.token)
          this.$store.dispatch('setUser', data)
        })
        .catch(({response}) => {
          if(response.data.msg) {
            this.redAlert = true
            this.errorMessage = response.data.msg
            setTimeout(() => {
              this.redAlert = false
            }, 3000);
          } else {
            console.log(response)
          }
        })
      })
      .catch(({response}) => {
        if(response.data.msg) {
          this.redAlert = true
          this.errorMessage = response.data.msg
          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function () {
            console.log('User signed out.');
          });
          setTimeout(() => {
            this.redAlert = false
          }, 3000);
        } else {
          console.log(response)
        }
      })
    }
  },
  mounted () {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  }
}
</script>

<style>
.or {
  margin-top: 3vh;
}
/* #full {
  min-height: 72vh;
} */
</style>
