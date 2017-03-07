<template>
	<div id="signup">
		<common-login :isLogin="0"></common-login>
	</div>
</template>

<script>
	import commonLogin from './commonLogin.vue'
	export default {
		name: 'signup',
		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			commonLogin
		}
	}

</script>

<style lang="scss">

</style>