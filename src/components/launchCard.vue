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
    playLoads: String,
    clientPlayLoads: String,
  },
};
</script>

<template>
  <p>{{ launchName }}</p>
  <p>{{ launchDate }}</p>
  <p>{{ missionDetails }}</p>
  <img v-bind:src="imgCapsule" v-bind:alt="'photo de la capsule ' + launchName" v-bind:title="launchName" />
  <p><a target="blank" v-bind:href="articleLink">plus d'info ici</a></p>
  <p>
    <a target="blank" v-bind:href="youTubeLink">voir la vidéo de lancement</a>
  </p>
  <p>{{ launchPlace }}</p>
  <p>{{ playLoads }}</p>
  <p>{{ clientPlayLoads }}</p>
</template>
