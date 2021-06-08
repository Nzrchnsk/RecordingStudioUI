<template>
  <div class="studio">
    <div class="container">
      <div class="row">
        <div class="col-md-3">{{ Studio.id }}</div>
        <div class="col-md-3">{{ Studio.name }}</div>
        <div class="col-md-3">{{ Studio.description }}</div>
        <div class="col-md-3">{{ Studio.address }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Studio",
  props: {
    Studio: {}
  }
}
</script>

<style scoped>

</style>