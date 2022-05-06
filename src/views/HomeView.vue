<script setup>
import countryCard from "../components/countryCard.vue";
</script>

<script>
export default {
	components: { countryCard },
	data() {
		return {
			isVisible: false,
			items: [{ message: "oui" }, { message: "non" }, { message: "ok" }],
			countries: [{}],
			isLoaded: false,
		};
	},
	methods: {
		changeVisible() {
			this.isVisible = !this.isVisible;
		},

		async getCountries() {
			const res = await fetch("https://restcountries.com/v3.1/all");
			const data = await res.json();
			console.log(data);
			this.countries = data;
			this.isLoaded = true;
			console.log(this.countries);
		},
	},

	mounted() {
		this.getCountries();
	},
};
</script>

<template>
	<h1>Welcome tot he space X Api</h1>
	<button @click="changeVisible">Click me</button>
	<h2 v-if="this.isVisible">hello</h2>
	<h2 v-else>GoodBye</h2>

	<ul v-if="isLoaded">
		<li v-for="(country, i) in countries" :key="i">
			<country-card v-if="i < 10" :countryName="country.name.common" :flag="country.flag" />
		</li>
	</ul>
	<p v-else>loading</p>
</template>

<style>
@import "@/assets/base.css";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

li {
	margin: 0;
}
</style>
