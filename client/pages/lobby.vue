<template>
  <section>
    {{ lobby() }}
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
    ...mapGetters('lobby', { lobby: 'find', get: 'get' })
  },
  mounted () {
    this.findLobby()
  },
  methods: {
    ...mapActions('lobby', { findLobby: 'find' })
  }
}
</script>
<style>
</style>
