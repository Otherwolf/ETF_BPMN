import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      options: {customProperties: true},
      light: {
        primary: '#1B4965',
        secondary: '#ffcd77',
        accent: '#2889c7'
      }
    }
  },
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
})

export default vuetify
