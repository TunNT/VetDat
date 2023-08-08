<template>
  <img src="/logo.png"  class="NuxtLogo" :width="width" :height="height">
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "260px"
    },
    height: {
      type: String,
      default: "80px"
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
