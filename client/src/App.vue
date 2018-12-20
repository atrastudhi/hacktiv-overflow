<template>
  <v-app id="full">
    <v-layout column>
    <toolbar />
    <router-view />
      <v-layout align-end>
        <footers />
      </v-layout>
    </v-layout>
  </v-app>
</template>

<script>
import toolbar from '@/components/toolbar'
import server from '@/api/server'
import footers from '@/components/footer'

export default {
  name: 'App',
  components: {
    toolbar,
    footers
  },
  data () {
    return {
      //
    }
  },
  mounted () {
    this.$store.dispatch('setQuestion')
    if(localStorage.getItem('token')) {
      server
      .get('/token', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$store.dispatch('setUser', {
          isLogin: true,
          email: data.email
        })
      })
      .catch(err => {

      })
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
#full {
  min-height: 100%;
}
</style>

