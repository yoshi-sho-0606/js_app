// Step1
// consoleに“hello world” を表示できるようにする
console.log('hello world')

const taskName = document.getElementById('task-name');
const taskSubmit = document.getElementById('task-submit');
const taskList = document.getElementById('task-list');

let tasks = []

// taskの総件数の初期表示
totalTasks()
// 完了済みtaskの件数の初期表示
totalDoneTasks()

//  ボタンをsubmitしたらタスクリストに自分が元々用意した値が（何度でも）追加されるようにする(preventDefault, event triggers)
function addTasks(task) {
  const newTask = {}
  const newTaskRow = document.createElement('tr')
  const newTaskName = document.createElement('td')
  const newDoneButton = document.createElement('td')
  const newDeleteButton = document.createElement('td')
  const taskId = tasks.length + 1

  newTaskRow.id = `row-${taskId}`

  newTaskName.innerHTML = `<p id="task-${taskId}">${task}<p>`
  newTaskRow.appendChild(newTaskName)

  newDoneButton.innerHTML = `<button id="done-${taskId}" onclick="changeStatus(event)">progress</button>`
  newTaskRow.appendChild(newDoneButton)

  newDeleteButton.innerHTML = `<button id="delete-${taskId}" onclick="deleteTask(event)">delete</button>`
  newTaskRow.appendChild(newDeleteButton)

  taskList.appendChild(newTaskRow);

  newTask.id = taskId
  newTask.name = task
  newTask.status = 'progress'

  tasks.push(newTask)

  totalTasks()
  totalDoneTasks()
}

//  formに入力した値がタスクリストに追加されるようにする(空っぽの文字列ご注意！）
taskSubmit.addEventListener('click', event => {
  event.preventDefault();

  const taskNmaeValue = taskName.value

  //  新しいタスクを追加するときにその値がconsoleに表示されるようにする。
  console.log(taskNmaeValue)

  if( taskNmaeValue == '' ){
    alert('空のタスクは表示登録できません！')
  }else{
    addTasks(taskNmaeValue);
  }
  taskName.value = ''
})

//  タスク完了ボタン機能を作成する
//  タスク完了ボタンを押したときにストライクスルーにする
function changeStatus(event) {
  const targetId = event.target.id.split('-')[1]
  const task = tasks.find(task => task.id == targetId)
  const displayTask = document.getElementById(`task-${targetId}`)

  if(task.status == 'done'){
    event.target.innerText = task.status = 'progress'
    displayTask.innerHTML = `<p id="task-${targetId}">${task.name}<p>`
  }else{
    event.target.innerText = task.status = 'done'
    displayTask.innerHTML = `<del id-"${targetId}">${task.name}</del>`
  }
  totalDoneTasks()
}

//  タスク削除機能を作成する
function deleteTask(event) {
  const targetId = event.target.id.split('-')[1]
  const targetTask = tasks.find(task => task.id == targetId)
  const targetRow = document.getElementById(`row-${targetId}`)

  targetRow.remove()
  tasks = tasks.filter(task => task.id != targetTask.id)

  totalTasks()
  totalDoneTasks()
}

//  タスクの総件数、完了済のタスクの表示
function totalTasks() {
  const displayTotalTask = document.getElementById('total-tasks')
  const tasksLength = tasks.length

  console.log(tasksLength)

  displayTotalTask.innerText = `total: ${tasksLength}`
}

function totalDoneTasks() {
  const displayDoneTasks = document.getElementById('done-tasks')
  const doneTasks = tasks.filter(task => task.status === 'done')

  displayDoneTasks.innerText = `done: ${doneTasks.length}`
}