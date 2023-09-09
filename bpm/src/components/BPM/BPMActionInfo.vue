<template>
  <span>
    <v-dialog
      justify="center"
      v-model="value"
      min-width="29vw"
      max-width="60vw"
      style="z-index: 100100"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-spacer></v-spacer>
          <v-toolbar-title v-if="action" align="center">Действие по задаче
            <i style="white-space: break-spaces">{{humanizedNamesFrom}}</i>
          </v-toolbar-title>
          <v-toolbar-title v-else align="center">Новое действие по задаче</v-toolbar-title>
          <v-spacer></v-spacer>
        <template v-slot:extension>
            <v-tabs
              v-model="tab"
              align-with-title
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab
                v-for="item in barItems"
                :key="item.name"
              >
                {{ item.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in barItems"
            :key="item.code"
          >
            <v-card-text v-if="item.code === 'info'">
              <BPMInput v-model="actionObj.name" text="Наименование"></BPMInput>
              <BPMInput v-model="actionObj.code" text="Код"></BPMInput>
              <BPMInput v-model="actionObj.color" text="Цвет действия" :isSelect="true"
                        help-text="Меняет цвет кнопки в задаче. Не влияет на алгоритмы"
                        :items="[
                          {title: 'Зелёный', code: 'success'},
                          {title: 'Красный', code: 'danger'},
                          {title: 'Жёлтый', code: 'warning'},
                          {title: 'Голубой', code: 'info'}
                        ]"></BPMInput>
              <BPMInput v-model="actionObj.require_final_comment" :isBoolean="true" text="Комменатрий обязательный"></BPMInput>
              <BPMInput v-model="actionObj.notify_manager_about_task_finish" :isBoolean="true"
                        help-text="Уведомление для верификатора о завершении задачи. Срабатывает только при выполнении данного действия"
                        text="Уведомить о завершении задачи"></BPMInput>
              <BPMInput v-model="actionObj.pre_message"
                        help-text="Добавляет автоматический комментарий к следующей задаче. Срабатывает только после данного действия"
                        text="Комментарий к следующей задаче"></BPMInput>
            </v-card-text>
            <v-card-text v-if="item.code === 'tasks'">
              <v-sheet
                align="left"
                min-height="120"
                outlined
                rounded
                shaped
                width="100%"
              >
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      clearable
                      :disabled="readonly"
                      hide-selected
                      v-model="actionObj.from"
                      :items="allTasks"
                      item-value="code"
                      item-text="title"
                      label="Требуемые задачи"
                      multiple
                      chips
                      hint="Следующие задачи запустятся по выполнению этого списка"
                      persistent-hint
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      clearable
                      :disabled="readonly"
                      hide-selected
                      v-model="actionObj.to"
                      :items="allTasks"
                      item-value="code"
                      item-text="title"
                      label="Следующие задачи"
                      multiple
                      chips
                      hint="Следующие задачи"
                      persistent-hint
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
        <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="red"
            text
            v-if="action"
            @click="removeSelf"
          >
            Удалить действие
          </v-btn>
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
  </span>
</template>

<script>
import {mapGetters} from 'vuex'
import BPMInput from './BPMInput'

export default {
  components: {
    BPMInput
  },
  name: 'BPMActionInfo',
  props: ['value', 'action', 'prevTask'],
  data () {
    return {
      actionObj: this.action || {},
      tab: null,
      barItems: [
        {
          name: 'Информация',
          code: 'info'
        },
        {
          name: 'задачи',
          code: 'tasks'
        }
      ]
    }
  },
  mounted () {
    if (!this.action) {
      this.actionObj.to = []
      this.actionObj.from = [this.prevTask]
    }
  },
  watch: {
    value (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    ...mapGetters('bpmContent', {readonly: 'readonly'}),
    ...mapGetters('bpmContent', {tasks: 'getTasks'}),
    humanizedNamesFrom () {
      if (this.actionObj && this.actionObj.from) {
        return this.humanizeTasks(this.actionObj.from)
      }
      return ''
    },
    allTasks () {
      let result = []
      this.tasks.forEach(el => {
        let task = el
        if (task instanceof Array) {
          task.forEach(tt => {
            if (tt.code !== 'empty') {
              result.push(tt)
            }
          })
        } else if (task.code !== 'empty') {
          result.push(task)
        }
      })
      return result
    }
  },
  methods: {
    humanizeTasks (list) {
      let result = []
      list.forEach(el => {
        let tasks = this.tasks.filter(t => t instanceof Array ? t.map(q => q.code).includes(el) : t.code === el)
        if (!tasks.length) return null
        if (tasks[0] instanceof Array) result.push(tasks[0].filter(t => t.code === el)[0].title)
        else result.push(tasks[0].title)
      })
      return result.join(', ')
    },
    save () {
    },
    removeSelf () {
      this.value = false
    }
  }
}
</script>

<style scoped>

</style>
