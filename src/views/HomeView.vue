<script setup>
import launchCard from "../components/launchCard.vue";
import Modal from "../components/Modal.vue";
</script>

<script>
export default {
	components: { launchCard, Modal },

	data() {
		return {
			countDown: "",
			isVisible: false,
			nextLaunch: {},
			launches: [{}],
			launchesPlaces: [{}],
			payloads: [{}],
			nextLaunchLoaded: false,
			isLoaded: false,
			successLaunches: null,
			video: "",
			showModal: false,
		};
	},
	methods: {
		changeVisible() {
			this.isVisible = !this.isVisible;
		},

		async getNextLaunches() {
			const res = await fetch("https://api.spacexdata.com/latest/launches/next");
			const data = await res.json();
			this.nextLaunch = data;
		},

		async getLaunches() {
			const res = await fetch("https://api.spacexdata.com/latest/launches");
			const data = await res.json();
			this.launches = data;
			this.isLoaded = true;
			console.log(data);
		},

		async getLaunchPads() {
			const res = await fetch("https://api.spacexdata.com/v4/launchpads");
			const data = await res.json();
			this.launchesPlaces = data;
			console.log(data);
		},

		findLaunchPad(launchId) {
			return this.launchesPlaces.find((obj) => obj.id === launchId);
		},

		successOrNotLaunches(e) {
			if (e.target.value === "") {
				return;
			}
			this.successLaunches = JSON.parse(e.target.value);
		},

		displayVideo(link) {
			this.showModal = !this.showModal;
			this.video = link;
		},

		dateCountDown(endDate) {
			const end = new Date(endDate);

			const seconds = 1000,
				minutes = seconds * 60,
				hours = minutes * 60,
				day = hours * 24;

			const timerDisplay = () => {
				const now = new Date();
				const isExpired = end - now;

				let dayCount = Math.floor(isExpired / day),
					hourCount = Math.floor((isExpired % day) / hours),
					minuteCount = Math.floor((isExpired % hours) / minutes),
					secondCount = Math.floor((isExpired % minutes) / seconds);

				if (isExpired < 0) {
					clearInterval(timer);
				}

				if (secondCount < 10) {
					secondCount = "0" + secondCount;
				} else if (minuteCount < 10) {
					minuteCount = "0" + minuteCount;
				} else if (hourCount < 10) {
					minuteCount = "0" + hourCount;
				}

				return dayCount + "j : " + hourCount + "h : " + minuteCount + "m : " + secondCount + "s";
			};

			const timer = setInterval(() => {
				this.countDown = timerDisplay();
			}, 1000);
		},
	},

	mounted() {
		this.getNextLaunches();
		this.getLaunches();
		this.getLaunchPads();
	},

	updated() {
		this.dateCountDown(this.nextLaunch.date_local);
		this.nextLaunchLoaded = true;
	},
};
</script>

<template>
	<main>
		<div style="background-color: rgba(0, 0, 0, 0.5); min-height: 100vh">
			<header>
				<h1>Bienvenue sur InfoSpace X</h1>
				<div style="display: flex">
					<h2 style="margin-right: 0.5rem">Prochain lancement dans</h2>
					<h2 v-if="nextLaunchLoaded">{{ countDown }}</h2>
					<div style="" v-if="!nextLaunchLoaded" class="loader-dot"></div>
				</div>
			</header>
			<section style="display: flex; align-items: center; justify-content: center">
				<div class="select-container">
					<p style="margin-right: 1rem">faite votre choix d'affichage</p>
					<select name="launchesSelector" @change="(e) => successOrNotLaunches(e)">
						<option disabled value="">-- filtrer votre recherche --</option>
						<option selected value="null">tout les lancements</option>
						<option value="true">lancements réussis</option>
						<option value="false">lancements échoués</option>
					</select>
				</div>
			</section>
			<section>
				<ul class="launch-container" v-if="isLoaded && successLaunches === null">
					<li v-for="launch in launches" :key="launch.id">
						<launchCard
							:launch-name="launch.name"
							:launch-date="launch.date_local"
							:mission-details="launch.details"
							:img-capsule="launch.links.patch.small"
							:article-link="launch.links.article"
							:launch-place="this.findLaunchPad(launch.launchpad).full_name"
							@open="displayVideo(launch.links.youtube_id)"
						/>
					</li>
				</ul>
				<ul class="launch-container" v-if="isLoaded && successLaunches">
					<li v-for="launch in launches" :key="launch.id">
						<launchCard
							v-if="launch.success"
							:launch-name="launch.name"
							:launch-date="launch.date_local"
							:mission-details="launch.details"
							:img-capsule="launch.links.patch.small"
							:article-link="launch.links.article"
							:launch-place="this.findLaunchPad(launch.launchpad).full_name"
							@open="displayVideo(launch.links.youtube_id)"
						/>
					</li>
				</ul>
				<ul class="launch-container" v-if="isLoaded && !successLaunches">
					<li v-for="launch in launches" :key="launch.id">
						<launchCard
							v-if="!launch.success"
							:launchName="launch.name"
							:launchDate="launch.date_local"
							:missionDetails="launch.details"
							:imgCapsule="launch.links.patch.small"
							:articleLink="launch.links.article"
							:launchPlace="this.findLaunchPad(launch.launchpad).full_name"
							@open="displayVideo(launch.links.youtube_id)"
						/>
					</li>
				</ul>
				<div v-if="!isLoaded" class="loader">Loading...</div>
			</section>
			<section>
				<Teleport to="body">
					<modal :show="showModal" @close="displayVideo">
						<template #header>
							<h3>Vidéo de lancement</h3>
						</template>
						<template #body>
							<iframe
								width="560"
								height="315"
								:src="'https://www.youtube.com/embed/' + this.video"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						</template>
					</modal>
				</Teleport>
			</section>
		</div>
	</main>
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/spinner.css";
@import "@/assets/homeView.css";
</style>
