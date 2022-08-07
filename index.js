// consoleに“hello world” を表示できるようにする
console.log('hello world')

const taskName = document.getElementById('task-name');
const taskSubmit = document.getElementById('task-submit');
const taskList = document.getElementById('task-list');

let tasks = [
  {
    id: 1,
    name: 'task_1',
    status: 'progress'
  }
]

// taskの初期表示
displayTasks()

// taskの総件数の初期表示
totalTasks()
// 完了済みtaskの件数の初期表示
totalDoneTasks()

//  ボタンをsubmitしたらタスクリストに自分が元々用意した値が（何度でも）追加されるようにする(preventDefault, event triggers)
function displayTask(task) {
  const newTaskRow = document.createElement('tr')
  const newTaskName = document.createElement('td')
  const newDoneButton = document.createElement('td')
  const newDeleteButton = document.createElement('td')

  newTaskRow.id = `row-${task.id}`

  if(task.status == 'done'){
    newTaskName.innerHTML = `<del id-"${task.id}">${task.name}</del>`
    newDoneButton.innerHTML = `<button id="done-${task.id}" onclick="changeStatus(event)">done</button>`
  }else{
    newTaskName.innerHTML = `<p id="task-${task.id}">${task.name}<p>`
    newDoneButton.innerHTML = `<button id="done-${task.id}" onclick="changeStatus(event)">progress</button>`
  }

  newDeleteButton.innerHTML = `<button id="delete-${task.id}" onclick="deleteTask(event)">delete</button>`

  newTaskRow.appendChild(newTaskName)
  newTaskRow.appendChild(newDoneButton)
  newTaskRow.appendChild(newDeleteButton)

  taskList.appendChild(newTaskRow);

  totalTasks()
  totalDoneTasks()
}

//  formに入力した値がタスクリストに追加されるようにする(空っぽの文字列ご注意！）
taskSubmit.addEventListener('click', event => {
  event.preventDefault();

  const taskNmaeValue = taskName.value

  if( taskNmaeValue == '' ){
    alert('空のタスクは表示登録できません！')
  }else if(tasks.filter(task => task.name == taskNmaeValue).length != 0) {
    alert('その名前のタスクは既に存在します！')
  }else{
    displayTask(addTask(taskNmaeValue))
    
    //  新しいタスクを追加するときにその値がconsoleに表示されるようにする。
    console.log(taskNmaeValue)
  }
  taskName.value = ''
})

//  タスク完了ボタン機能を作成する
//  タスク完了ボタンを押したときにストライクスルーにする
function changeStatus(event) {
  const targetId = event.target.id.split('-')[1]
  const task = tasks.find(task => task.id == targetId)

  if(task.status == 'done'){
    task.status = 'progress'
  }else{
    task.status = 'done'
  }
  
  totalDoneTasks()
  tasks.sort(sortTasks)
  taskList.innerHTML = '';
  displayTasks()
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

// taskを新規登録する（tasksの配列にpushする）
function addTask(newTaskName) {
  const newTask = {}

  newTask.id = tasks.length + 1
  newTask.name = newTaskName
  newTask.status = 'progress'

  tasks.push(newTask)

  return newTask
}

function displayTasks(){
  tasks.forEach(task => {
    displayTask(task)
  })
}

// タスクが完了したら進行中のタスクより下に、進行中に戻したら完了したタスクの上に表示されるようにする
function sortTasks(a, b) {
  return b.status.length - a.status.length
}