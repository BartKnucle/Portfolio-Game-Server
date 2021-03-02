<template>
  <section>
    <v-data-iterator
      :items="game().data"
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
    {{ game() }}
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
    ...mapGetters('game', { game: 'find', get: 'get' }),
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
    this.findGame()
  },
  methods: {
    ...mapActions('game', { findGame: 'find' })
  }
}
</script>
<style>
</style>
