<template>
  <div>
    <v-toolbar dark color="orange">

      <v-btn class="white--text" flat @click="home">Hacktiv-overflow</v-btn>

      <v-layout justify-end>
        <v-img 
        :src="`https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2016/05/lowongan-kerja-Hacktiv8.png`"
        max-height="70px"
        max-width="70px"
        >
        </v-img>
      </v-layout>

      <v-spacer></v-spacer>

      <ask v-if="isLogin === true"/>

      <v-btn dark flat v-if="isLogin === true" @click.prevent="mypage">
        My Page
      </v-btn>

      <v-btn icon v-if="isLogin === true">
        <v-icon>notifications</v-icon>
      </v-btn>

      <signin v-if="isLogin === false"/>

      <v-btn dark flat v-if="isLogin === true" @click.prevent="logout">
        Logout
      </v-btn>

    </v-toolbar>
  </div>
</template>

<script>
import signin from '@/components/signin'
import ask from '@/components/create-question'
import { mapState } from 'vuex';

export default {
  name: 'toolbar',
  components: {
    signin,
    ask
  },
  methods: {
    logout () {
      var auth2 = gapi.auth2.getAuthInstance();
      return auth2.signOut()
      .then(() => {
        localStorage.clear()
        this.$store.dispatch('setUser', {
          email: '',
          isLogin: false
        })
        this.$router.push('/')
        console.log('User signed out.');
      });
    },
    home () {
      this.$router.push('/')
    },
    mypage () {
      this.$router.push('/mypage')
    }
  },
  computed: mapState({
    isLogin: 'isLogin'
  })
}
</script>

<style>

</style>
