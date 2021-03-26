<template>
  <FeathersVuexFind
    v-slot="{ items: users }"
    service="users"
    :params="{ query: {} }"
    watch="query"
  >
    <section>
      {{ users }}
    </section>
  </FeathersVuexFind>
</template>

<script>
export default {
  name: 'Users'
}
</script>
