<template>
  <div class="List">
    <Studio v-for="(Studio, index) in StudiosList.data" :key="index" v-bind:Studio="Studio"/>
  </div>
</template>

<script>
import db from './db';
import Studio from "./Studio";

export default {
  name: "StudiosList",
  data() {
    return {
      StudiosList: []
    };
  },
  async mounted() {
    this.StudiosList = await db.Get("Studio/", [[]]);
  },
  components: {
    Studio
  }
};
</script>

<style scoped>

</style>