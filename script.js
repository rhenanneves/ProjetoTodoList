// script.js
// script.js
function addTask(columnId) {
    var taskInput = prompt("Digite a nova tarefa:");

    if (taskInput !== null && taskInput.trim() !== "") {
        var columnElement = document.getElementById("column" + columnId);
        var taskList = columnElement.querySelector(".task-list");

        var li = document.createElement("li");
        li.innerHTML = taskInput + '<button onclick="removeTask(this)">Remover</button>';
        li.draggable = true;  // Adiciona o atributo draggable
        li.ondragstart = function (event) {
            drag(event);
        };
        taskList.appendChild(li);

        // Fazer a requisição ao servidor após adicionar à lista
        fetch('http://localhost:3000/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ columnId, taskInput }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            // Atualizar a interface do usuário conforme necessário
        })
        .catch(error => {
            console.error('Erro:', error);
            // Lidar com erros de acordo com a sua lógica
        });
    }
}




function removeTask(button) {
    var li = button.parentElement;
    li.remove();
}
// ... (seu código existente)

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.innerText);
}


function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/plain");
    var columnElement = ev.target.closest(".column");

    if (columnElement) {
        var taskList = columnElement.querySelector(".task-list");
        var li = document.createElement("li");
        li.innerText = data;

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.onclick = function() {
            removeTask(removeButton);
        };
        
        // Adicione o atributo draggable="false" ao botão
        removeButton.setAttribute("draggable", "false");

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }
}


