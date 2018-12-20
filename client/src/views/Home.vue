<template>
  <div>
    <register v-if="isLogin === false"/>
    <question v-if="isLogin === true"/>
  </div>
</template>

<script>
import register from '@/components/register'
import question from '@/components/question-list'
import {mapState} from 'vuex'

  export default {
    name: 'home',
    components: {
      register,
      question
    },
    data () {
      return {
        //
      }
    },
    computed: mapState({
        email: 'email',
        isLogin: 'isLogin'
      })
  }
</script>
