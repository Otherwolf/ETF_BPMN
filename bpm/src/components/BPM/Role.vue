<template>
  <div class="role-container">
    <v-btn
      text
      :width="code ? 140 : null"
      @click="dialog = true"
      color="#1B4965"
      class="vert-text">
      <p class="text-wrap" style="width: min-content; margin: auto;">{{name}}</p>
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
  name: 'Role',
  props: ['name', 'code'],
  components: {
    'dialog-add': DialogAddTop
  },
  data () {
    return {
      dialogText: !this.code ? 'Добавить Роль' : 'Редактировать Роль "' + this.name + '"',
      dialog: false,
      title: !this.code ? '' : this.name,
      codeSave: this.code
    }
  },
  methods: {
    save (e) {
      if (!this.code) {
        this.$store.dispatch('bpmContent/addRole', e, { root: true })
      } else {
        this.$store.dispatch('bpmContent/changeRole',
          {role: e, code: this.code},
          { root: true }
        )
      }
    }
  }
}
</script>

<style scoped>
.role-container {
  writing-mode: vertical-rl;
  transform: rotate(-90deg);
  width: 40px;
  min-height: 10px;
}
.vert-text {
  text-transform: capitalize;
  max-width: 140px;
}
</style>
