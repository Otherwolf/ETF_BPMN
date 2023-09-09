<template>
  <drop-list
      class="bpm-header"
      :items="items"
      @reorder="$event.apply(items)"
      @insert="putItem"
      tag="tr"
      mode="cut">
    <template v-slot:item="{item,reorder}">
      <drag
        :drag-image-opacity="0.5"
        :key="item.code || item.title || 'empty'"
        :data="item"
        :go-back="true"
        :disabled="!item.code"
        @cut.stop="cutItem(items, item)"
        class="stage-th"
        tag="th">
        <span v-if="item.code || item.title">
          <stage :code="item.code" :name="item.title" v-if="!reorder"></stage>
          <th v-else style="font-size: 1.2em">{{item.title}}</th>
        </span>
      </drag>
    </template>
  </drop-list>
</template>

<script>
import {Drag, Drop, DropList} from 'vue-easy-dnd'
import Stage from './Stage'
import {mapGetters} from 'vuex'

export default {
  name: 'BPMStages',
  components: {
    Stage,
    Drag,
    DropList,
    Drop
  },
  data () {
    return {
      items: [
      ]
    }
  },
  watch: {
    items (value, oldValue) {
      if (oldValue.length) {
        this.$store.dispatch('bpmContent/setStages',
          value.filter(el => el.code),
          { root: true })
      }
    }
  },
  computed: {
    ...mapGetters('bpmContent', {stages: 'getStages'})
  },
  created () {
    let stages = [{}].concat(this.stages)
    stages.push({title: '+'})
    this.items = stages
  },
  methods: {
    putItem (event) {
      this.items.splice(event.index, 0, event.data)
    },
    cutItem (array, value) {
      let index = array.indexOf(value)
      array.splice(index, 1)
    }
  }
}
</script>

<style>
.bpm-header {
  margin: 10px;
  height: 20px;
}
.stage-th {
  text-align: center;
}
</style>
