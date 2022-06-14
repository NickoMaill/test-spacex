<script>
export default {
	props: {
		launchName: String,
		launchDate: String,
		missionDetails: String,
		imgCapsule: String,
		altImg: String,
		articleLink: String,
		youTubeLink: String,
		launchPlace: String,
		payloads: Array,
		clientPlayLoads: String,
	},

	methods: {
		formatDate(localDate) {
			const newDate = new Date(localDate);

			const date = {
				year: newDate.getFullYear().toString(),
				month:
					newDate.getMonth().toString().length < 2
						? "0" + newDate.getMonth().toString()
						: newDate.getMonth().toString(),
				day:
					newDate.getDate().toString().length < 2
						? "0" + newDate.getDate().toString()
						: newDate.getDate().toString(),
				hours:
					newDate.getHours().toString().length < 2
						? "0" + newDate.getHours().toString()
						: newDate.getHours().toString(),
				minutes:
					newDate.getMinutes().toString().length < 2
						? "0" + newDate.getMinutes().toString()
						: newDate.getMinutes().toString(),
				seconds:
					newDate.getSeconds().toString().length < 2
						? "0" + newDate.getSeconds().toString()
						: newDate.getSeconds().toString(),
			};
			return date.day + "/" + date.month + "/" + date.year;
		},
	},
};
</script>

<template>
	<div class="card-container animate__animated animate__fadeIn">
		<h3>{{ launchName }}</h3>
      <img
        class="capsule-patch"
        :src="imgCapsule"
        :alt="'photo de la capsule '+ launchName"
        :title="launchName"
        style="margin-block: 1rem;"
      />
		<p>lancée le {{ this.formatDate(launchDate) }}</p>
		<p>détails de la mission : {{ missionDetails }}</p>
		<div class="links-container">
			<p><a target="blank" :href="articleLink">plus d'info ici</a></p>
			<button @click="$emit('open')">voir la vidéo de lancement</button>
		</div>
		<p>Aire de lancement : <strong>{{ launchPlace }}</strong></p>
		<ul>
			<li v-for="(payload, i) in payloads" :key="i">{{ payload }}</li>
		</ul>
		<p>{{ clientPlayLoads }}</p>
	</div>
</template>

<style>
@import 'animate.css';

.card-container {
	border: solid #000 2px;
  background-color: #f1f1f1dd;
  border-radius: 2rem;
	margin-block: 1rem;
  display: flex;
  flex-direction: column;
  align-items:center ;
  width: 25rem;
  padding: 1rem;
  margin-inline: 2rem;
  height: 30rem;
}

.capsule-patch {
	width: 8rem;
}

.links-container {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
p{
  text-align: center;
}
</style>
