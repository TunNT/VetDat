<template>
  <img src="/favicon.ico"  class="NuxtLogo" :width="width" :height="height">
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "40px"
    },
    height: {
      type: String,
      default: "36px"
    },
  },
}
</script>


<style>
.NuxtLogo {
  animation: 2s appear;
}

@keyframes appear {
  0% {
    opacity: 0.2;
  }
}
</style>
