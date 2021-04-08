<template>
  <section>
    <v-data-table
      :items="players().data"
      :headers="headers"
    />
    {{ players() }}
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('players', { players: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Game',
          value: 'game'
        },
        {
          text: 'Score',
          value: 'score'
        },
        {
          text: 'x',
          value: 'x'
        },
        {
          text: 'y',
          value: 'y'
        }
      ]
    }
  },
  mounted () {
    this.findPlayers()
  },
  methods: {
    ...mapActions('players', { findPlayers: 'find' })
  }
}
</script>
<style>
</style>
