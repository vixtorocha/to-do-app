let todoList = {
    todos: [],

    addTodo: function (todoText) {

        this.todos.push({
            todoText: todoText, //O primeiro todo é a propriedade e o segundo é o parametro.
            completed: false,
        });
    },

    changeTodos: function (position, valueTodoText) {
        this.todos[position].todoText = valueTodoText;
    },

    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },

    toggleCompleted: function (position) {
        this.todos[position].completed = !this.todos[position].completed //inverte o bollean
    },

    toggleAll: function () {
        let totalTodos = this.todos.length;
        let completedTodos = 0;

        //Checa quantas tarefas estão checadas
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

//Os handlers servem para realizar DOM manipulation.
let handlers = {
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },

    addTodo: function () {
        let addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },

    changeTodo: function (position) {
        let changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodos(position, changeTodoTextInput.value);
        changeTodoPositionInput = '';
        changeTodoTextInput = '';
        view.displayTodos();
    },

    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },

    toggleCompleted: function (position) {
        todoList.toggleCompleted(position);
        toggleCompletedPositionInput = '';
        view.displayTodos();
    }
};

let view = {

    /**
     * Exibe as tarefas na tela
     */
    displayTodos: function () {
        let todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        todoList.todos.forEach(function (todo, position) {

            let todoLi = document.createElement('li');

            todoLi.id = position;
            todoLi.className = 'list-group-item'
            todoLi.appendChild(this.createsEditButton());
            todoLi.appendChild(this.createsToggleButton(todo));
            todoLi.appendChild(this.createsTodoTextSection(todo));
            todoLi.appendChild(this.createsDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },

    /**
     * Cria um botão de editar tarefa.
     * @param {Object} todo 
     */
    createsEditButton: function () {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Edit';
        deleteButton.className = 'editButton btn btn-sm btn-outline-info d-inline';
        return deleteButton;
    },

    /**
     * Cria uma checkbox na tarefa para que seja possível marcá-la
     * como completa.
     * @param {Object} todo 
     */
    createsToggleButton: function (todo) {
        let toggleButton = document.createElement('input');
        toggleButton.type = 'checkbox';

        if (todo.completed === true) {
            toggleButton.checked = true;
        } else {
            toggleButton.checked = false;
        }

        toggleButton.className = 'toggleButton d-inline'
        return toggleButton;
    },

    /**
     * Cria um botão Delete na tarefa.
     */
    createsDeleteButton: function () {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'deleteButton btn btn-sm btn-outline-danger d-inline';
        return deleteButton;
    },

    /**
     * Exibe o texto da tarefa de acordo com seu estado.
     * @param {Object} todo 
     */
    createsTodoTextSection: function (todo) {
        let todoTextSection = document.createElement('p');

        if (todo.completed === true) {
            todoTextSection.className = 'strikethrough text-muted'
        }
        todoTextSection.className += ' d-inline'

        todoTextSection.textContent = todo.todoText;
        return todoTextSection;
    },

    /**
     * Coloca um input no lugar da tarefa.
     * @param {Object} todoLi O elemento 'li' que será editado
     */
    createsChangeTodoInput: function (todoLi) {
        console.log("Objeto:", todoLi);
        todoText = todoLi.querySelector('p').textContent;

        //Remove tudo dentro do li
        while (todoLi.firstChild) {
            todoLi.removeChild(todoLi.firstChild);
        }

        //Coloca um input no lugar
        let todoChangeInputElement = document.createElement('input');
        todoChangeInputElement.value = todoText; //Mostra o texto atual.
        todoChangeInputElement.id = 'changeTodoTextInput';

        let changeButton = document.createElement('button');
        changeButton.textContent = 'Alterar'
        changeButton.className = 'confirmChangeButton'

        todoLi.appendChild(todoChangeInputElement);
        todoLi.appendChild(changeButton);

    },

    /**
     * Cria event listeners nos botões.
     */
    setUpEventListeners: function () {
        let todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function (event) {
            let elementClicked = event.target;

            //Checa se o elemento clicado é um botão delete.
            if (elementClicked.className.includes('deleteButton')) {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }

            //Checa se o elemento cliclado é um toggle
            if (elementClicked.className.includes('toggleButton')) {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }

            //Checa se o elemento cliclado é um botão de editar
            if (elementClicked.className.includes('editButton')) {
                view.createsChangeTodoInput(elementClicked.parentNode);
            }

            //Checa se o elemento clicado foi um botão de 'alterar' a modificação
            if (elementClicked.className.includes('confirmChangeButton')) {
                handlers.changeTodo(parseInt(elementClicked.parentNode.id));
            }
        });

        todosUl.addEventListener()
    }
}

// setUpEventListeners precisa ser chamado para funcionar.
view.setUpEventListeners();