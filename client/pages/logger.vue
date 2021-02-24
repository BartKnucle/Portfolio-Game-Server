<template>
  <section>
    {{ logger() }}
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
    ...mapGetters('logger', { logger: 'find', get: 'get' })
  },
  mounted () {
    this.findLogger()
  },
  methods: {
    ...mapActions('logger', { findLogger: 'find', removeLogger: 'remove' })
  }
}
</script>
<style>
</style>
