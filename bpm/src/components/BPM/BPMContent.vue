<template>
  <v-main class="bpm-content" id="Body">
    <div id="container-crossing"></div>
    <table>
      <thead><BPMStages></BPMStages></thead>
      <BPMRoles></BPMRoles>
    </table>
    <BPMPanel></BPMPanel>
  </v-main>
</template>

<script>
import Role from './Role'
import BPMRoles from './BPMRoles'
import BPMPanel from './BPMPanel'
import Task from './Task'
import BPMStages from './BPMStages'
import { mapGetters } from 'vuex'
import LeaderLine from 'leader-line-new'

export default {
  name: 'BPMContent',
  components: {
    Role,
    Task,
    BPMRoles,
    BPMStages,
    BPMPanel
  },
  data () {
    return {
      crossObjs: [],
      crossing: '<span class="crossing-symbol">+</span><div class="rhomb secondary"></div>'
    }
  },
  watch: {
    roles () {
      this.updateAll()
    },
    stages () {
      this.updateAll()
    },
    tasks () {
      this.drawArrows()
      this.updateAll()
    }
  },
  computed: {
    ...mapGetters('bpmContent', {roles: 'getRoles'}),
    ...mapGetters('bpmContent', {tasks: 'getTasks'}),
    ...mapGetters('bpmContent', {actions: 'getActions'}),
    ...mapGetters('bpmContent', {arrows: 'getArrows'}),
    ...mapGetters('bpmContent', {stages: 'getStages'})
  },
  created () {
    this.sortTasks()
  },
  mounted () {
    // this.zoomOut(70)
    // document.addEventListener('keypress', (event) => {
    //   if (event.code === 'Minus') {
    //     this.zoomOut()
    //   } else if (event.code === 'Equal') {
    //     this.zoomIn()
    //   }
    // })
  },
  methods: {
    zoomIn () {
      const Page = document.getElementsByTagName('html')[0]
      const zoom = parseInt(Page.style.zoom) + 10 + '%'
      Page.style.zoom = zoom
    },
    zoomOut (value = null) {
      let zoom = ''
      const Page = document.getElementsByTagName('html')[0]
      if (value) {
        zoom = value + '%'
      } else {
        zoom = parseInt(Page.style.zoom) - 10 + '%'
      }
      Page.style.zoom = zoom
    },
    updateAll () {
      setTimeout(() => {
        this.updateCrossing()
        this.updatePosArrows()
      }, 40)
    },
    sortTasks () {
      this.$store.dispatch('bpmContent/sortTasks',
        { root: true })
    },
    updatePosArrows (event) {
      for (let i in this.arrows) {
        this.arrows[i].position()
      }
    },
    isSystemTask (code) {
      const tasks = this.tasks.filter(t => t.code === code)
      if (tasks.length) {
        return tasks[0].role === 'system'
      }
    },
    removeAllArrows () {
      this.$store.dispatch('bpmContent/cleanArrows',
        { root: true })
    },
    createArrowsByTask (task) {
      if (task.code === 'empty' || !task.code || task.code.slice(-3) === '_aq') return
      let actions = this.actions.filter(action => action.from.includes(task.code))
      actions.forEach(action => {
        let currentTasks = action.to.filter(t => t.slice(-3) !== '_aq')
        this.createArrow(task, currentTasks, action)
      })
    },
    createArrow (fromTask, toTasks, action) {
      const color = this.getColorArrowByStatus(action.color)
      let dash = action.color !== 'success'
      let fromEl = document.getElementById(fromTask.code)
      const fromElCoords = fromEl.getBoundingClientRect()
      if (color === 'grey') fromEl = LeaderLine.mouseHoverAnchor(fromEl)
      if (toTasks.length > 1) {
        const toObjs = toTasks.map(code => document.getElementById(code))
        const toCoords = toObjs.map(o => o.getBoundingClientRect())
        let newCrossing = this.drawCrossing(fromElCoords, toCoords, fromTask.code)
        this.crossObjs.push(
          {
            crossing: newCrossing,
            from: fromEl,
            to: toObjs
          }
        )
        this.createLine(fromEl, newCrossing, color, dash, 'right', null)
        toTasks.forEach(code => {
          const toEl = document.getElementById(code)
          this.createLine(newCrossing, toEl, color, dash, null)
        })
      } else if (toTasks.length === 1) {
        let code = toTasks[0]
        const toEl = document.getElementById(code)
        this.createLine(fromEl, toEl, color, dash)
      }
    },
    createLine (from_, to_, color = 'green', dash = true, start = 'right', end = 'left') {
      const newLine = new LeaderLine(from_, to_,
        {color, path: 'grid', dash, startSocket: start, endSocket: end}
      )
      console.log(newLine)
      this.$store.dispatch('bpmContent/addArrow', newLine, { root: true })
    },
    drawCrossing (fromElCoords, toCoords, id = null, crossObj = null) {
      const mainEl = document.getElementById('container-crossing')
      const coords = this.getMediumCoords(fromElCoords, toCoords)
      let newCrossing = null
      if (crossObj) newCrossing = crossObj
      else {
        newCrossing = document.createElement('div')
        newCrossing.innerHTML = this.crossing
        newCrossing.setAttribute('class', 'crossing')
        newCrossing.id = id + '_crossing'
        newCrossing.addEventListener('mouseenter', this.hover)
        newCrossing.addEventListener('mouseleave', this.hoverEnd)
        mainEl.appendChild(newCrossing)
      }
      newCrossing.style = `left : ${coords.x}px; top: ${coords.y}px`
      return newCrossing
    },
    getMediumCoords (fromElCoords, toCoords) {
      const startCoords = this.getElCoords(fromElCoords)
      let medium = [startCoords, startCoords, startCoords]
      toCoords.forEach(el => medium.push(this.getElCoords(el)))
      const mediumX = medium.reduce(
        (previousValue, currentValue) => previousValue + currentValue.x, 0
      ) / medium.length - 10
      let mediumY = medium.reduce(
        (previousValue, currentValue) => previousValue + currentValue.y, 0
      ) / medium.length - 40
      if (Math.abs(startCoords.y - mediumY) < 90) {
        mediumY = startCoords.y - 20
      }
      return {
        x: mediumX,
        y: mediumY
      }
    },
    getElCoords (el) {
      const rootCoords = document.body.getBoundingClientRect()
      let pointX = (el.left - rootCoords.left) + el.width / 2
      let pointY = (el.top - rootCoords.top) + el.height / 2
      return {
        x: pointX,
        y: pointY
      }
    },
    getColorArrowByStatus (status) {
      const colors = {
        success: 'rgb(26 88 0 / 20%)',
        danger: 'rgb(197 54 54 / 30%)',
        warning: 'rgb(240 183 63 / 30%)'
      }
      return colors[status] || 'grey'
    },
    drawArrows () {
      this.removeAllArrows()
      console.log('drawing arrows')
      this.tasks.forEach(task => {
        if (task.length) {
          task.forEach(t => {
            this.createArrowsByTask(t)
          })
        } else this.createArrowsByTask(task)
      })
    },
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
    },
    updateCrossing () {
      console.log('update crossing')
      this.crossObjs.forEach(el => {
        this.drawCrossing(
          el.from.getBoundingClientRect(),
          el.to.map(o => o.getBoundingClientRect()),
          '',
          el.crossing
        )
      })
    }
  }
}
</script>

<style>
html {
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(180deg, #1B4965, #2c719d);
}
body {
  zoom: 100%;
}
.crossing {
  position: absolute;
  width: 45px;
  height: 45px;
  text-align: center;
}
.rhomb {
  position: relative;
  width: 30px;
  left: 1.4em;
  top: -33px;
  height: 30px;
  opacity: 0.7;
/* Rotate */
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
/* Rotate Origin */
  -webkit-transform-origin: 0 100%;
  -moz-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -o-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
.rhomb:hover {
  z-index: 100000;
  opacity: 0.8;
  border: 3px solid blue !important;
}
.crossing-symbol {
  z-index: 0;
  font-size: 2em;
}
</style>
