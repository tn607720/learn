// window.onload = function(){
//     var app = new Vue({
//         el:"#app",
//         data:{
//             message:"aaaaaaa"
//         }
//     });
// }
window.onload=function(){
    var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
    fetch: function(){
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        todos.forEach( function (todo,index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
    }
}

var filters = {
    all: function (todos) {
        return todos
    },
    active: function (todos) {
        return todos.filters( function(todo) {
            return !todo.completed
        })
    },
    completed: function (todos) {
        return todos.filters( function(todo){
            return todos.completed
        } )
    }
}

var app = new Vue({
    data: {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        visibility : 'all'
    },
    watch: {
        todos: {
            handler: function (todos){
                todoStorage.save(todos)
            },
            deep: true
        }
    },

    computed: {
        filteredTodos: function() {
            return filters[this.visibility](this.todos)
        },
        remaining: function () {
            return filters.active(this.todos).length
        },
        allDone: {
            get: function () {
                return this.remaining === 0
            },
            set: function(){
                this.todos.foreach(function(todo) {
                    todo.completed = value
                } )
            }
        }
    },

    filters: {
        pluralize: function(n) {
            return n ===1 ? 'item' : 'items'
        }
    },
    methods: {
        addTodo: function() {
            var value = this.newTodo && this.newTodo.trim()
            if(!value){
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            })
            this.newTodo = ''
        },
        
        removeTodo: function(todo) {
            this.todos.splice(this.todos.indexof(todo),1)
        },

        editTodo: function (todo) {
            this.beforeEditCache = todo.title
            this.editedTodo = todo
        },

        doneEdit: function(todo) {
            if(!this.editedTodo){
                return
            }
            this.editedTodo = null
            todo.title = todo.title.trim()
            if(!todo.title){
                this.removeTodo(todo)
            }
        },

        cancelEdit: function(todo) {
            this.editedTodo = null
            todo.title = this.beforeEditCache
        },

        removeCompleted: function() {
            this.todos = filters.active(this.todos)
        }
    },
    directives: {
        'todo-focus': function(el,binding) {
            if(binding.value){
                el.focus()
            }
        }
    }
})

function onHashChange () {
    var visibility = window.location.hash.replace(/#\/?/,'')
    if(filters[visibility]) {
        app.visibility = visibility
    } else {
        window.location.hash =''
        app.visibility = 'all'
    }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

app.$mount('.todoapp')
}
