document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var todoInput = document.getElementById('todo-input');
    var todoText = todoInput.value.trim();
    if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = '';
    }
});

function addTodoItem(text) {
    var todoList = document.getElementById('todo-list');
    var li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);
    li.querySelector('.delete-btn').addEventListener('click', function() {
        todoList.removeChild(li);
    });
}


