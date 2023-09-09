<template>
  <div class="stage-container">
    <v-btn
      @click="dialog = true"
      color="#1B4965"
      :outlined="name === '+'"
      block
      class="vert-text"
      :class="name !== '+' ? 'white--text' : ''">
      {{name}}
    </v-btn>
    <dialog-add
      v-if="dialog"
      v-model="dialog"
      :text="dialogText"
      @save="save"
      :title="title"
      :code="codeSave">
    </dialog-add>
  </div>
</template>

<script>
import DialogAddTop from './DialogAddTop'

export default {
  name: 'Stage',
  props: ['name', 'code'],
  components: {
    'dialog-add': DialogAddTop
  },
  data () {
    return {
      dialogText: !this.code ? 'Добавить Этап' : 'Редактировать Этап "' + this.name + '"',
      dialog: false,
      title: !this.code ? '' : this.name,
      codeSave: this.code
    }
  },
  methods: {
    save (e) {
      if (!this.code) {
        this.$store.dispatch('bpmContent/addStage', e, { root: true })
      } else {
        this.$store.dispatch('bpmContent/changeStage',
          {'stage': e, 'code': this.code},
          { root: true }
        )
      }
    }
  }
}
</script>

<style scoped>
.stage-container {
  min-height: 30px;
  min-width: 100px;
}
.vert-text {
  text-transform: capitalize;
}
</style>
