import tasks from '@/temp/tasks'
import actions from '@/temp/actions'
import BPM from '@/helpers/BPM'

export default {
  namespaced: true,
  state: {
    readonly: false,
    tasks: [],
    arrows: [],
    actions: actions,
    roles: [
      {'title': 'АС', 'code': 'system', 'index': 0},
      {'title': 'Агент', 'code': 'agent', 'index': 1},
      {'title': 'Куратор', 'code': 'curator', 'index': 2},
      {'title': 'Верификаторы', 'code': 'manager', 'index': 3},
      {'title': 'Андеррайтеры', 'code': 'underwriter', 'index': 4},
      {'title': 'СБ', 'code': 'security_service', 'index': 5},
      {'title': 'ПУ', 'code': 'legal_departament', 'index': 6},
      {'title': 'Выдача', 'code': 'final_documents', 'index': 7},
      {'title': 'Сопровождение', 'code': 'escort', 'index': 8},
      {'title': 'Коллегиальные органы', 'code': 'colleg_org', 'index': 9},
      {'title': 'Страховая компания', 'code': 'insurance_company', 'index': 10}
    ],
    stages: [
      {'title': 'Оформление заявки', 'code': 'Оформление заявки'},
      {'title': 'Верификация', 'code': 'Верификация'},
      {'title': 'Подготовка заключений', 'code': 'Подготовка заключений'},
      {'title': 'Коллегиальное принятие решения', 'code': 'Коллегиальное принятие решения'},
      {'title': 'Согласование правок', 'code': 'Согласование правок'},
      {'title': 'Оплата и документы', 'code': 'Оплата и документы'},
      {'title': 'Предоставление БГ', 'code': 'Предоставление БГ'}
    ]
  },
  getters: {
    readonly: state => state.readonly,
    getTasks: state => state.tasks,
    getArrows: state => state.arrows,
    getActions: state => state.actions,
    getRoles: state => state.roles,
    getStages: state => state.stages
  },
  mutations: {
    sortTasks (state) {
      const obj = new BPM(tasks, state.actions, state.stages, state.roles)
      state.tasks = obj.getOrderedTasks()
    },
    addRole (state, role) {
      for (let i in state.roles) {
        if (state.roles[i].code === role.code) {
          alert('Роль с таким кодом уже существует')
          return
        }
      }
      state.roles.push(role)
    },
    addStage (state, stage) {
      for (let i in state.stages) {
        if (state.stages[i].code === stage.code) {
          alert('Этап с таким кодом уже существует')
          return
        }
      }
      state.stages.push(stage)
    },
    changeRole (state, {role, code}) {
      for (let i in state.roles) {
        if (state.roles[i].code === code) {
          state.roles[i] = role
          break
        }
      }
      state.roles = [...state.roles]
    },
    setStages (state, {stages}) {
      state.stages = stages
    },
    setRoles (state, {roles}) {
      state.roles = roles
    },
    setArrows (state, arrows) {
      state.arrows = arrows
    },
    cleanArrows (state) {
      state.arrows.forEach(el => el.remove())
      state.arrows = []
    },
    addArrow (state, arrow) {
      state.arrows.push(arrow)
    },
    changeStage (state, {stage, code}) {
      for (let i in state.stages) {
        if (state.stages[i].code === code) {
          state.stages[i] = stage
          break
        }
      }
      state.stages = [...state.stages]
    }
  },
  actions: {
    async sortTasks ({ dispatch, commit }) {
      commit('sortTasks')
    },
    async addRole ({ dispatch, commit }, role) {
      commit('addRole', role)
    },
    async addStage ({ dispatch, commit }, stage) {
      commit('addStage', stage)
    },
    async changeRole ({ dispatch, commit }, {role, code}) {
      commit('changeRole', {role, code})
    },
    async changeStage ({ dispatch, commit }, {stage, code}) {
      commit('changeStage', {stage, code})
    },
    async setStages ({ dispatch, commit }, stages) {
      commit('setStages', {stages})
    },
    async setRoles ({ dispatch, commit }, roles) {
      commit('setRoles', {roles})
    },
    async setArrows ({ dispatch, commit }, arrows) {
      commit('setArrows', arrows)
    },
    async cleanArrows ({dispatch, commit}) {
      commit('cleanArrows')
    },
    async addArrow ({dispatch, commit}, arrow) {
      commit('addArrow', arrow)
    }
  }
}
