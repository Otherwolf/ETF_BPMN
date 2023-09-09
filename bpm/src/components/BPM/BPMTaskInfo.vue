<template>
  <span>
    <v-dialog
      justify="center"
      v-model="value"
      min-width="30vw"
      max-width="60vw"
      style="z-index: 10000"
    >
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-spacer></v-spacer>
          <v-toolbar-title align="center">Задача <i>"{{task.title}}"</i></v-toolbar-title>
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
            <v-card flat>
              <v-spacer></v-spacer>
              <v-card-text v-if="item.code === 'info'">
                <BPMInput v-model="task.title" text="Наименование"></BPMInput>
                <BPMInput v-model="hRole" text="Роль"></BPMInput>
                <BPMInput v-model="task.stage" text="Этап"></BPMInput>
                <BPMInput :isBoolean="true" v-model="task.has_aq" text="Есть дозапрос?"
                          v-if="!['agent', 'system'].includes(task.role)"
                          :helpText="task.role === 'manager' ?
                  'Создаёт дополнительно задачи для взаимодействия с агентом' :
                  'Создаёт дополнительно задачи для взаимодействия с верификатором и агентом через верификатора'"></BPMInput>
              </v-card-text>
              <v-card-text v-if="item.code === 'details'">
                <BPMInput
                  v-model="task.code"
                  text="Код задачи"
                  helpText="Код задачи необходим для корректной работы БП. Должен иметь уникальное значение"></BPMInput>
                <BPMInput v-model="task.stage" text="Комментарий при создании задачи"
                helpText="При создании данной задачи будет выводиться данный комментарий. Если исполнитель предыдущей задачи оставит комментарий для данной задачи, то текст приплюсуется к данному комментарию"></BPMInput>
                <BPMInput :isBoolean="true" v-model="task.has_aq"
                          text="Можно заявку в отказ?" v-if="!['agent', 'system'].includes(task.role)"
                          helpText="Добавляет в задаче кнопку 'Кинуть заявку в отказ'"></BPMInput>
                <BPMInput :isBoolean="true" v-model="task.has_aq"
                          text="Доступна для перезапуска?" v-if="!['agent', 'system'].includes(task.role)"
                          helpText="Отображает задачу в списке задач для перезапуска"></BPMInput>
                <BPMInput :isBoolean="true" v-model="task.has_aq"
                          text="Уведомить исполнителя о старте задачи?" v-if="!['system'].includes(task.role)"
                          helpText=""></BPMInput>
              </v-card-text>
              <v-card-text v-if="item.code === 'arrows'" class="pt-0">
                <v-tabs
                  fixed-tabs
                  v-model="tab2"
                  align-with-title
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                  <v-tab
                    v-for="item in links"
                    :key="item.name"
                  >
                    {{ item.name }}
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab2">
                  <v-tab-item
                    v-for="item in links"
                    :key="item.code"
                  >
                    <v-row v-show="item.code === 'in'">
                      <v-sheet
                      align="left"
                      elevation="4"
                      min-height="120"
                      outlined
                      rounded
                      shaped
                      width="100%"
                    >
                      <v-list>
                        <v-list-item-group>
                          <v-list-item
                            style="border-bottom: 1px solid lightgray"
                            v-for="(item, i) in fromTasks"
                            :key="i"
                            :class="removedArrows.includes(item.id) ? 'grey lighten-3' : ''"
                          >
                            <v-list-item-icon>
                              <v-icon color="secondary" v-text="'mdi-location-enter'"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content :disabled="removedArrows.includes(item.id)" @click="openAction(item)">
                              <v-list-item-title
                                v-text="humanizeTasks(item.from) + (removedArrows.includes(item.id) ? ' (удалено) Восстановить?' : ' -> текущая задача')">
                              </v-list-item-title>
                              <span v-if="item.from.length > 1" class="grey--text">После выполнения списка задач</span>
                            </v-list-item-content>
                            <v-list-item-icon @click="removeArrow(item)" v-if="!removedArrows.includes(item.id)">
                              <v-icon color="red" v-text="'mdi-close'"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon @click="recoverArrow(item)" v-else>
                              <v-icon color="green" v-text="'mdi-backup-restore'"></v-icon>
                            </v-list-item-icon>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item
                            :key="'+'"
                          >
                            <v-list-item-content align="center" @click="dialogAction = true">
                              <v-list-item-title class="grey--text" v-text="'Добавить'"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                    </v-row>
                    <v-row v-show="item.code === 'out'">
                      <v-sheet
                      align="left"
                      elevation="4"
                      min-height="120"
                      outlined
                      rounded
                      shaped
                      width="100%"
                    >
                      <v-list>
                        <v-list-item-group>
                          <v-list-item
                            style="border-bottom: 1px solid lightgray"
                            v-for="(item, i) in toTasks"
                            :key="i"
                            :class="removedArrows.includes(item.id) ? 'grey lighten-3' : ''"
                          >
                            <v-list-item-icon>
                              <v-icon color="green" v-text="'mdi-location-exit'"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content :disabled="removedArrows.includes(item.id)" @click="openAction(item)">
                              <v-list-item-title
                                v-text="'текущая задача -> ' + humanizeTasks(item.to) + (removedArrows.includes(item.id) ? ' (удалено) Восстановить?' : '')">
                              </v-list-item-title>
                              <span v-if="item.to.length > 1" class="grey--text">Запуск параллельных задач</span>
                            </v-list-item-content>
                            <v-list-item-icon @click="removeArrow(item)" v-if="!removedArrows.includes(item.id)">
                              <v-icon color="red" v-text="'mdi-close'"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-icon @click="recoverArrow(item)" v-else>
                              <v-icon color="green" v-text="'mdi-backup-restore'"></v-icon>
                            </v-list-item-icon>
                          </v-list-item>
                          <v-divider></v-divider>
                          <v-list-item
                            :key="'+'"
                            class="pa-0"
                          >
                            <v-list-item-content align="center" @click="dialogAction = true">
                              <v-list-item-title class="grey--text" v-text="'Добавить'"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-sheet>
                    </v-row>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <v-divider></v-divider>
         <v-card-actions>
          <v-spacer></v-spacer>
           <v-btn
            color="red"
            text
            @click="removeSelf"
          >
            Удалить задачу
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
    <BPMActionInfo
      :prevTask="task"
      v-if="dialogAction"
      v-model="dialogAction"
      :action="selectedAction"
    ></BPMActionInfo>
  </span>
</template>

<script>
import BPMInput from './BPMInput'
import BPMActionInfo from './BPMActionInfo'
import {mapGetters} from 'vuex'

export default {
  components: {
    BPMInput,
    BPMActionInfo
  },
  name: 'BPMTaskInfo',
  props: ['value', 'task'],
  data () {
    return {
      selectedAction: null,
      dialogAction: false,
      removedArrows: [],
      tab: null,
      tab2: null,
      links: [{
        'name': 'Ссылки на текущую задачу',
        'code': 'in'
      }, {
        'name': 'Ссылки на следующие задачи',
        'code': 'out'
      }],
      barItems: [{
        name: 'Информация',
        code: 'info'
      }, {
        name: 'Детали',
        code: 'details'
      }, {
        name: 'Связи',
        code: 'arrows'
      }]
    }
  },
  watch: {
    dialogAction (val) {
      if (!val) {
        this.selectedAction = null
      }
    },
    value (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    ...mapGetters('bpmContent', {roles: 'getRoles'}),
    ...mapGetters('bpmContent', {tasks: 'getTasks'}),
    ...mapGetters('bpmContent', {actions: 'getActions'}),
    hRole () {
      return this.roles.filter(el => el.code === this.task.role)[0].title
    },
    fromTasks () {
      return this.actions.filter(el => el.to.includes(this.task.code))
    },
    toTasks () {
      return this.actions.filter(el => el.from.includes(this.task.code))
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
    removeArrow (arrow) {
      if (this.removedArrows.includes(arrow.id)) return null
      setTimeout(() => {
        this.removedArrows.push(arrow.id)
      }, 100)
    },
    recoverArrow (item) {
      if (!this.removedArrows.includes(item.id)) return null
      this.removedArrows = this.removedArrows.filter(id => {
        return id !== item.id
      })
    },
    removeSelf () {
      if (confirm('Подтвердите удаление задачи')) {
        this.value = false
      }
    },
    openAction (item) {
      this.selectedAction = item
      this.dialogAction = true
    }
  }
}
</script>

<style scoped>
</style>
