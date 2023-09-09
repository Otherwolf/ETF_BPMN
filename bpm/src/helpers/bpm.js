
export default class BPM {
  constructor (tasks, actions, stages, roles) {
    this.tasks = tasks
    this.actions = actions
    this.stages = stages
    this.roles = roles
  }
  getTaskByCode (code) {
    let tasks = this.tasks.filter(task => task.code === code)
    if (!tasks.length) {
      alert('Не существует задачи с кодом ' + code)
    } else {
      return tasks[0]
    }
  }
  getActionsByTaskCode (code) {
    return this.actions.filter(
      (action) => action.from.includes(code) && action.to[0].slice(-3) !== '_aq'
    )
  }
  getTasksFromActions (actions) {
    if (!actions.length) return []
    let codes = [].concat.apply([], actions.map(action => action.to))
    return this.tasks.filter(task => codes.includes(task.code))
  }
  getEmptyRolesByTasks (tasks) {
    const filledRoles = tasks.map(task => task.role)
    return this.roles.filter(role => !filledRoles.includes(role.code))
  }
  createEmptyTasks (nextTasks, currentCodes) {
    let orderedTasks = []
    let stages = [
      ...new Map(nextTasks.map((item) => [item['stage'], item])).values()
    ].map(el => el.stage)
    stages.forEach(stage => {
      this.getEmptyRolesByTasks(nextTasks.filter(tt => tt.stage === stage)).forEach(role => {
        orderedTasks.push({
          'title': 'empty',
          'code': 'empty',
          'role': role.code,
          'stage': stage
        })
      })
    })
    return orderedTasks
  }
  filterTasks (tasks, currentCodes) {
    tasks = tasks.filter(t => {
      return !currentCodes.includes(t.code)
    })
    tasks = [
      ...new Map(tasks.map((item) => [item['code'], item])).values()
    ]
    return tasks
  }
  groupTasksByRole (tasks) {
    return Object.values(tasks.reduce((rv, x) => {
      (rv[x.role + x.stage] = rv[x.role + x.stage] || []).push(x)
      return rv
    }, {})).map(el => {
      if (el.length > 1) return el
      else return el[0]
    })
  }
  getCurrentTasksCodes (tasks) {
    let t = []
    tasks.forEach(el => {
      if (el.code) return t.push(el.code)
      t = t.concat(el.map(e => e.code))
    })
    return t.filter(el => el !== 'empty')
  }
  getOrderedTasks () {
    let orderedTasks = []
    const startingTasks = this.tasks.filter((el) => el.is_starting)
    if (!startingTasks.length) {
      alert('Нет задачи для начала БП')
    } else {
      let nextTasks = startingTasks
      orderedTasks.push(nextTasks[0])
      while (true) {
        const currentCodes = this.getCurrentTasksCodes(orderedTasks)
        orderedTasks = orderedTasks.concat(this.createEmptyTasks(nextTasks, currentCodes))
        let tempTasks = nextTasks.reduce((prev, nextT) => {
          let tt = this.getTasksFromActions(
            this.getActionsByTaskCode(nextT.code)
          )
          return prev.concat(tt)
        }, [])
        tempTasks = this.filterTasks(tempTasks, currentCodes)
        nextTasks = tempTasks
        orderedTasks = orderedTasks.concat(this.groupTasksByRole(tempTasks))
        if (!nextTasks.length) break
      }
    }
    const taskNames = this.getCurrentTasksCodes(orderedTasks)
    this.tasks.forEach(task => {
      if (!taskNames.includes(task.code)) {
        orderedTasks.push(task)
      }
    })
    return orderedTasks
  }
}
