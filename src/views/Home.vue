<template>
  <div class="home">
    <router-link to="/about"><HelloWorld msg="ELF"/></router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' 

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    fetch() {
      this.$store.dispatch('fetchList')
    }
  },
  computed: {
    tag() {
      return this.$store.state.tag.data
    }
  },
  beforeMount() {
    // this.fetch()
  }
}
</script>
