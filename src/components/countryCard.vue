<script>
export default {
	props: {
		countryName: String,
        flag: String
	},
};
</script>

<template>
	<p>{{ countryName }}</p>
	<p>{{ flag }}</p>
</template>
