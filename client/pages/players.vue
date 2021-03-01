<template>
  <section>
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
    ...mapGetters('players', { players: 'find', get: 'get' })
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
