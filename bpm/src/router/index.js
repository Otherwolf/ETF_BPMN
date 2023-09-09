import Vue from 'vue'
import Router from 'vue-router'
import BPMContent from '@/components/BPM/BPMContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/bpm',
      name: 'bpm_new',
      component: BPMContent
    }
  ]
})
