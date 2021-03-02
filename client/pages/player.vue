<template>
  <section>
    <v-data-table
      :items="player().data"
      :headers="headers"
    />
    {{ player() }}
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
    ...mapGetters('player', { player: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        },
        {
          text: 'Game ID',
          value: 'game'
        },
        {
          text: 'Online',
          value: 'online'
        }
      ]
    }
  },
  mounted () {
    this.findPlayer()
  },
  methods: {
    ...mapActions('player', { findPlayer: 'find' })
  }
}
</script>
<style>
</style>
