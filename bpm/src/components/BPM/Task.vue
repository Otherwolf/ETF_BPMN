<template>
  <span>
    <span v-if="value.code !== 'empty'">
        <v-card
          @mouseenter="$emit('mouseover', $event)"
          @mouseleave="$emit('mouseout', $event)"
          @click="isOpenedDetails = true"
          width="150px"
          :id="value.code"
          elevation="7"
          outlined
          :color="value.role !== 'system' ? '#e0efff' : '#fcffe7'"
          class="pa-4 task-container"
        >
          <v-badge
            color="grey"
            content="Дозапрос"
            :value="+value.has_aq"
          >
            <span>
              {{value.title}}
            </span>
          </v-badge>
        </v-card>
    </span>
    <span v-else>
      <div style="display: table-caption; width: 290px"></div>
    </span>
    <BPMTaskInfo
      v-if="isOpenedDetails"
      v-model="isOpenedDetails"
      :task="value"
    >
    </BPMTaskInfo>
  </span>
</template>

<script>
import BPMTaskInfo from './BPMTaskInfo'

export default {
  components: {
    BPMTaskInfo
  },
  props: ['value'],
  name: 'Task',
  data () {
    return {
      isOpenedDetails: false
    }
  }
}
</script>

<style>
.task-container {
  display: table-caption;
  cursor: pointer;
  margin: 30px 75px;
  opacity: 0.7;
  border: 3px solid #1B4965 !important;
  max-width: 250px;
}
.task-container:hover {
  z-index: 100;
  opacity: 1;
  border: 3px solid blue !important;
}
</style>
