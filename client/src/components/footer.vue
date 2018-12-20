<template>
    <v-footer
      dark
      height="auto"
      style="width: 100vw"
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title class="orange">
          <strong class="subheading">Get connected with us on social networks!</strong>

          <v-spacer></v-spacer>

          <v-btn
            class="mx-3"
            dark
            icon
          >
            <v-icon size="24px">call</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-actions class="grey darken-3 justify-center">
          &copy;2018 — <strong>Hacktivoverflow</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  name: 'footers',
}
</script>

<style>

</style>
