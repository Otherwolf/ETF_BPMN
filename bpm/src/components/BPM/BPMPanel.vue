<template>
<v-card>
    <v-navigation-drawer
      class="mt-10 mr-4 bpm-panel__container mb-4"
      width="110"
      height="90vh"
      fixed
      permanent
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><h3 class="bpm-panel__title">BPMN</h3></v-list-item-title>
            <v-list-item-subtitle>v0.1</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-navigation-drawer>
</v-card>
</template>

<script>
export default {
  name: 'BPMPanel'
}
</script>

<style scoped>
.bpm-panel__container {
  border: 1px solid #1B4965 !important;
  opacity: .9;
}
.bpm-panel__title {
  color: #1B4965;
}
</style>
