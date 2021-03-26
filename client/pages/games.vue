<template>
  <section>
    <v-data-iterator
      :items="games().data"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template #default="games">
        <v-row>
          <v-col
            v-for="game in games.items"
            :key="game._id"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ game._id }}
              </v-card-title>
              Seed: {{ game.seed }}

              <v-list
                v-for="item in game.players"
                :key="item._id"
                dense
              >
                <v-list-item>
                  {{ item._id }}
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    {{ games() }}
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
    ...mapGetters('games', { games: 'find', get: 'get' }),
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
    this.findGames()
  },
  methods: {
    ...mapActions('games', { findGames: 'find' })
  }
}
</script>
<style>
</style>
