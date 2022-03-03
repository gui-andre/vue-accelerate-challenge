<template>
	<div class="header__wrapper">
		<NavBar  class="header__navbar">
			<BaseIcon slot="left" icon="ic_arrow_left" colors="var(--primary-element)" />
			<span slot="center">Movimentações</span>
		</NavBar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NavBar, BaseIcon } from '@warrenbrasil/nebraska-web'

@Component({
	components: {
		NavBar,
		BaseIcon,
	}
})
export default class Header extends Vue {}
</script>

<style scoped>
	.header__navbar {
		background-color: var(--light-brand-primary);
	}

	.header__navbar, span {
		color: #FFF;
		text-transform: uppercase;
	}
</style>
