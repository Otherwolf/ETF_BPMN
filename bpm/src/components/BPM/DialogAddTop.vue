<template>
  <v-row>
    <v-dialog
      persistent
      justify="center"
      v-model="value"
      max-width="490"
    >
      <v-card>
        <v-toolbar
          color="#1B4965"
          dark
          flat
        >
          <v-spacer></v-spacer>
          <v-toolbar-title align="center">{{text}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
          <BPMInput v-model="title2" text="Наименование"></BPMInput>
          <BPMInput v-model="code2" text="Код"></BPMInput>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="value = false"
          >
            Отменить
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="save"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import BPMInput from './BPMInput'

export default {
  components: {
    BPMInput
  },
  name: 'DialogAddTop.vue',
  props: ['value', 'text', 'title', 'code', 'index'],
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'Обязательное поле'
      },
      title2: this.title,
      code2: this.code,
      readonly: true
    }
  },
  methods: {
    save () {
      if (this.readonly) {
        alert('БП доступен только для чтения')
        return
      }
      if (!this.title2 || !this.code2) {
        alert('Введите обязательные поля')
        return
      }
      this.$emit('save', {
        title: this.title2,
        code: this.code2
      })
      this.value = false
    }
  }
}
</script>

<style scoped>
</style>
