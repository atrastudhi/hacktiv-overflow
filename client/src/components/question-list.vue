<template>
  <v-container class="full">
    <h1><v-icon color="orange">question_answer</v-icon> Question</h1>
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
          <v-btn @click.prevent="detail(list.id)" icon class="text-md-center"><v-icon color="white">more</v-icon></v-btn>
        </v-layout>

      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'question-list',
  data () {
    return {
      //
    }
  },
  methods: {
    detail (id) {
      this.$router.push(`/question/${id}`)
    }
  },
  computed: mapState({
    question: 'question'
  })
}
</script>

<style>
  #v-list {
    background: #ff9800;
    color: white;
    max-width: 100vw;
    border: solid;
    border-color: white;
    border-width: 0.2wh
  }
  #icon {
    margin-right: 3vw
  }
  #center {
    max-width: 50vw;
  }
</style>
