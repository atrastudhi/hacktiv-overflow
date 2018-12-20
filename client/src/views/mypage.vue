<template>
    <v-container>
    <h1><v-icon color="orange">question_answer</v-icon> My Question Page</h1>
    <v-list id="v-list" v-for="list in question" :key="list.id">
      <v-list-tile
        icon
      >

        <div id="icon">
          <v-icon>arrow_upward</v-icon> {{ list.upVote }}
          <v-icon>arrow_downward</v-icon> {{ list.downVote }}
        </div>

        <v-layout row>
          <v-list-tile-content>
            <h3>{{ list.title }}</h3>
            <small>Author: {{ list.owner }}</small>
            <small>Date: {{ list.date }}</small>
          </v-list-tile-content>
          <v-btn @click.prevent="remove(list.id)" icon class="text-md-center"><v-icon color="red">delete</v-icon></v-btn>
          <update :list="list"/>
          <v-btn @click.prevent="detail(list.id)" icon class="text-md-center"><v-icon color="white">more</v-icon></v-btn>
        </v-layout>

      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import update from '@/components/update-question'
import moment from 'moment'

export default {
  name: 'mypage',
  components: {
    update
  },
  data () {
    return {
      question: []
    }
  },
  methods: {
    setQuestion () {
      firebase.firestore().collection('Question').where('owner', '==', this.email).onSnapshot(({docs}) => {
        let temp = []
        docs.forEach(e => {
          let object = e.data()
          object.id = e.id
          object.date = moment(object.date).format("LLL"); 
          temp.push(object) 
        });
        this.question = temp
      })
    },
    remove (id) {
      firebase.firestore().collection('Question').doc(id).delete()
    },
    detail (id) {
      this.$router.push(`/question/${id}`)
    } 
  },
  mounted () {
    this.setQuestion()
  },
  computed: mapState({
    email: 'email'
  })
}
</script>

<style>

</style>
