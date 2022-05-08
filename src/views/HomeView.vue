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
      isLoaded: false,
      successLaunches: null,
      showModal: false,
    };
  },
  methods: {
    changeVisible() {
      this.isVisible = !this.isVisible;
    },

    async getNextLaunches() {
      const res = await fetch("https://api.spacexdata.com/v5/launches/next");
      const data = await res.json();
      this.nextLaunch = data;
      this.isLoaded = true;
    },

    async getLaunches() {
      const res = await fetch(
        "https://api.spacexdata.com/v5/launches/query?limit=10",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      this.launches = data.docs;
      console.log(this.launches);
    },

    async getLaunchPads() {
      const res = await fetch("https://api.spacexdata.com/v4/launchpads");
      const data = await res.json();
      this.launchesPlaces = data;
      console.log(this.launchesPlaces);
    },

    findLaunchPad(launchId){
      this.launchesPlaces.find(obj => obj.id === launchId ? obj.full_name : "")
    },

    successOrNotLaunches(e) {
      this.successLaunches = JSON.parse(e.target.value);
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

        return (
          dayCount +
          "j : " +
          hourCount +
          "h : " +
          minuteCount +
          "m : " +
          secondCount +
          "s"
        );
      };

      const timer = setInterval(() => {
        this.countDown = timerDisplay();
      }, 1000);
    },

    eventTest(event) {
      console.log(event.target.value);
    },
  },

  mounted() {
    this.getNextLaunches();
    this.getLaunches();
    this.getLaunchPads();
  },

  updated() {
    this.dateCountDown(this.nextLaunch.date_local);
  },
};
</script>

<template>
  <h1>Bienvenue sur InfoSpace X</h1>
  <h2>Prochain lancement dans {{ countDown }}</h2>
  <button @click="changeVisible">Click me</button>
  <h2 v-if="this.isVisible">hello</h2>
  <h2 v-else>GoodBye</h2>
  <select name="launchesSelector" @change="(e) => successOrNotLaunches(e)">
    <option disabled selected value="">-- filtrer votre recherche --</option>
    <option value="null">tout les lancements</option>
    <option value="true">lancements réussis</option>
    <option value="false">lancements échoués</option>
  </select>

  <ul v-if="isLoaded && successLaunches === null">
    <li v-for="(launch, i) in launches" :key="i">
      <launch-card
        :launchName="launch.name"
        :launchDate="launch.date_local"
        :missionDetails="launch.details"
        :imgCapsule="launch.links.patch.small"
        :articleLink="launch.links.article"
        :youTubeLink="launch.links.webcast"
        :launchPlace="this.findLaunchPad(launch.launchpad)"
      />
    </li>
  </ul>
  <p v-if="!isLoaded">loading</p>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
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
