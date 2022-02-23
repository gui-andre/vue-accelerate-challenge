<template>
  <ContextColorProvider id="app">
    <router-view />
  </ContextColorProvider>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ContextColorProvider } from '@warrenbrasil/nebraska-web'

@Component({
  components: {
    ContextColorProvider
  }
})
export default class App extends Vue {}
</script>
