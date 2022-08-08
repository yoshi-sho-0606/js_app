// consoleに“hello world” を表示できるようにする
console.log('hello world')

const taskName = document.getElementById('task-name');
const taskSubmit = document.getElementById('task-submit');
const taskList = document.getElementById('task-list');


// ローカルストレージを使用したタスクの初期化
let tasks = []
let storageTasks = localStorage.getItem("tasks")

function setTasks() {
  if(storageTasks){
    tasks.push(...JSON.parse(storageTasks))
  }
}

setTasks()

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

//  formに入力した値がタスクリストに追加されるようにする
taskSubmit.addEventListener('click', event => {
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

  taskList.innerHTML = '';

  tasks.sort(sortTasks)

  setLocalStorage()
  totalDoneTasks()
  displayTasks()
}

//  タスク削除機能を作成する
function deleteTask(event) {
  const targetId = event.target.id.split('-')[1]
  const targetTask = tasks.find(task => task.id == targetId)
  const targetRow = document.getElementById(`row-${targetId}`)

  targetRow.remove()
  tasks = tasks.filter(task => task.id != targetTask.id)

  setLocalStorage()
  totalTasks()
  totalDoneTasks()
}

//  タスクの件数表示
function totalTasks() {
  const displayTotalTask = document.getElementById('total-tasks')
  const tasksLength = tasks.length

  displayTotalTask.innerText = `total: ${tasksLength}`
}
// 完了済みの件数表示
function totalDoneTasks() {
  const displayDoneTasks = document.getElementById('done-tasks')
  const doneTasks = tasks.filter(task => task.status === 'done')

  displayDoneTasks.innerText = `done: ${doneTasks.length}`
}

// taskを新規登録する（tasksの配列にpushする）
function addTask(newTaskName) {
  const newTask = {}
  
  newTask.id = ( Number(setLargestId()) + 1)
  newTask.name = newTaskName
  newTask.status = 'progress'

  tasks.push(newTask)
  
  setLocalStorage()

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

// ローカルストレージに保存されているタスクのIDの一番大きなものを取得する
function setLargestId() {
  let largestId = 1
  const ids = []

  if(tasks.length != 0){
    tasks.forEach(task => {
      ids.push(task.id)
    })
    largestId = Math.max(...ids)
  }
  return largestId
}

// ローカルストレージの更新
function setLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks))
}