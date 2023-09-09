<template>
  <v-app id="app-root">
    <v-progress-linear
        style="z-index: 10000"
        v-if="isLoading"
        :active="!!isLoading"
        :indeterminate="!!isLoading"
        fixed
      ></v-progress-linear>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      isLoading: false
    }
  }
}
</script>

<style>
</style>
