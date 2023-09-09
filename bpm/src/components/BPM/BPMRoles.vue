<template>
  <drop-list
      :items="items"
      @reorder="$event.apply(items)"
      @insert="putItem"
      tag="tbody"
      mode="cut">
    <template v-slot:item="{item,reorder}">
      <drag
        :drag-image-opacity="0.5"
        :key="`role_${item.code} + ${item.title}` || 'empty'"
        :data="item"
        :disabled="!hoveredRoles"
        :go-back="true"
        @cut.stop="cutItem(items, item)"
        class="role-rw"
        tag="tr">
        <th class="role-th" :class="reorder ? 'reordered-role-td' : ''"
            @mouseenter="hoveredRoles++"
            @mouseleave="hoveredRoles--">
          <role :name="item.title" :code="item.code"></role>
        </th>
        <td class="bpm-content" v-for="k in stages" :key="k.code + '__' + item.code">
          <BPMRow :role="item.code" :stage="k.code"></BPMRow>
        </td>
      </drag>
    </template>
  </drop-list>
</template>

<script>
import {Drag, Drop, DropList} from 'vue-easy-dnd'
import Stage from './Stage'
import BPMRow from './BPMRow'
import Role from './Role'
import {mapGetters} from 'vuex'

export default {
  name: 'BPMRoles',
  components: {
    Stage,
    BPMRow,
    Role,
    Drag,
    DropList,
    Drop
  },
  data () {
    return {
      hoveredRoles: 0,
      items: []
    }
  },
  watch: {
    items (value, oldValue) {
      if (oldValue.length) {
        this.$store.dispatch('bpmContent/setRoles',
          value.filter(el => el.code),
          { root: true })
      }
    }
  },
  computed: {
    ...mapGetters('bpmContent', {roles: 'getRoles'}),
    ...mapGetters('bpmContent', {stages: 'getStages'})
  },
  created () {
    this.items = this.roles
    this.items.push({'title': '+'})
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

<style scoped>
.role-rw {
  max-height: 140px;
}
.role-th {
  border: 3px solid #1B4965;
  border-radius: 5px;
  border-left: 0;
  vertical-align: baseline;
  left: 0;
  position: sticky;
  position: -webkit-sticky;
  z-index: 2;
  background-color: white;
}
.reordered-role-td {
  border: none;
}
.bpm-content {
  border-right: 2px solid #f1f0f0;
  border-bottom: 1px solid #f8f8f8;
  white-space:nowrap;
}
</style>
