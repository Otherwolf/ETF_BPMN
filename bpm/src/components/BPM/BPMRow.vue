<template>
  <span>
    <span v-for="(task, i) in currentTasks" :key="`task_${task.code}${i}`">
      <span v-if="!(task instanceof Array)">
        <task
          @mouseover="hover($event)"
          @mouseout="hoverEnd($event)"
          :value="task">
        </task>
      </span>
      <span v-else style="display: inline-block">
        <span v-for="(t, j) in task" :key="`task_${t.code}${i}${j}`">
          <task
            @mouseover="hover($event)"
            @mouseout="hoverEnd($event)"
            :value="t">
          </task>
          <br>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
import {mapGetters} from 'vuex'
import Task from './Task'

export default {
  name: 'BPMRow',
  props: ['stage', 'role'],
  components: {
    Task
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('bpmContent', {tasks: 'getTasks'}),
    ...mapGetters('bpmContent', {arrows: 'getArrows'}),
    currentTasks () {
      return this.tasks.filter(
        v => {
          if (v instanceof Array) {
            v = v[0]
          }
          return v.role === this.role && v.stage === this.stage && v.code.slice(-3) !== '_aq'
        }
      )
    }
  },
  methods: {
    getArrowByTarget (target) {
      if (!this.arrows) return []
      return this.arrows.filter(arrow => arrow.end === target || arrow.start === target)
    },
    hover (e) {
      const arrows = this.getArrowByTarget(e.target)
      arrows.forEach(el => {
        el.oldColor = el.color
        if (el.end.id === e.target.id) {
          el.color = 'orange'
        } else {
          el.color = 'green'
        }
        el.size += 1
      })
    },
    hoverEnd (e) {
      const arrows = this.getArrowByTarget(e.target)
      arrows.forEach(el => {
        el.color = el.oldColor
        el.size -= 1
      })
    }
  }
}
</script>

<style scoped>
</style>
