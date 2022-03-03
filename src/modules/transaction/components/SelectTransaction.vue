<template>
	<td class="select-transaction__wrapper">
		<BaseIcon icon="ic_eye_on" colors="var(--light-brand-primary)" />
	</td>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BaseIcon } from '@warrenbrasil/nebraska-web'

@Component({
	components: {
		BaseIcon
	}
})
export default class SelectTransaction extends Vue {}
</script>

<style scoped>
	.select-transaction__wrapper {
		vertical-align: middle;
		cursor: pointer;
	}
</style>
