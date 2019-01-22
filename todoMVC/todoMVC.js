/*
el 設置 class .開頭 id #開頭
*/
// window.onload = function(){
//     new Vue({
//         el:".todomvc",
//         data: {
//             message : "daaaa"
//         }
//     });
// }
var todo = '';
var a= 0;
var app = new Vue({
    el:".todomvc",
    data: {
        message : "daaaa",
        todos: [],
        newtodo: '',
        ntodo: '',
        alltodo: [],
    },
    methods: {
        addtodo: function(){
            this.todos.push({
                id: a++,
                value: this.ntodo,
                compeleted: false
            });
            this.alltodo = this.alltodo.concat(this.todos[this.todos.length-1]);
            
            this.ntodo = '';
        },
        deltodo: function(todo){
            this.todos.splice(this.todos.indexOf(todo),1);
        },
        setcompelete: function(todo){
            todo.compeleted = !todo.compeleted
        },
        showAll: function(){
            this.todos = this.alltodo;
        },
        showActive: function(){
            this.todos = [];
            for(i=0;i<this.alltodo.length;i++){
                if(!this.alltodo[i].compeleted){
                    this.todos.push(this.alltodo[i]);
                }
            }
        },
        showCompeleted: function(){
            this.todos = [];
            for(i=0;i<this.alltodo.length;i++){
                if(this.alltodo[i].compeleted){
                    this.todos.push(this.alltodo[i]);
                }
            }
        },
        allCompeleted: function(){
            this.todos = [];
            for(i=0;i<this.alltodo.length;i++){
                this.alltodo[i].compeleted = true;
            }
            this.todos = this.alltodo;
        },
        delCompeleted: function(){
            this.todos = [];
            var ll = this.alltodo.length;
            var a = 0;
            var b = this.alltodo.length-1;
            if(ll>0){
                while(a<ll){
                    if(this.alltodo.length==0){
                        break;
                    }
                    if(this.alltodo[b].compeleted){
                        this.alltodo.splice(this.alltodo.indexOf(this.alltodo[b]),1);
                        if(this.alltodo.length==1){
                            this.alltodo.pop();
                        }
                        b--;
                    }
                    a++;
                    
                }
            }
            
            // for(i=ll-1;i>-1;i--){
            //     if(this.alltodo[i].compeleted){
            //         this.alltodo.splice(this.alltodo.indexOf(this.alltodo[i]),1);
            //         if(this.alltodo.length>1){
            //             i=this.alltodo.length -1;
            //             this.alltodo.pop();
            //         }
                    
            //     }
            // }
            this.todos = this.alltodo;
        }
    },
});
app.$mount('.todomvc');