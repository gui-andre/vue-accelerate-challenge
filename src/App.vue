<template>
  <ContextColorProvider id="app" context="brand">
		<Header />
    <router-view />
  </ContextColorProvider>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ContextColorProvider } from '@warrenbrasil/nebraska-web'
import Header from './components/Header.vue'

@Component({
  components: {
    ContextColorProvider,
		Header,
  }
})
export default class App extends Vue {}
</script>

<style scoped>
	@import '~@warrenbrasil/nebraska-tokens-web/assets/colors.css';
	@import '~@warrenbrasil/nebraska-tokens-web/assets/spacings.css';
	@import '~@warrenbrasil/nebraska-tokens-web/assets/typography.css';
	@import './assets/styles/reset.css'
</style>
