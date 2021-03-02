<template>
  <section>
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
    ...mapGetters('player', { player: 'find', get: 'get' })
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
