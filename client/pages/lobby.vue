<template>
  <section>
    <v-data-table
      :items="lobby().data"
      :headers="headers"
    />
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
    ...mapGetters('lobby', { lobby: 'find', get: 'get' }),
    headers () {
      return [
        {
          text: 'ID',
          value: '_id'
        }
      ]
    }
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
