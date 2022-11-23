const loginToken = localStorage.getItem("token-login");

if(!loginToken) {
    window.location.pathname = "/login.html"   
}

// DOM
const elUsersList = document.querySelector(".js-list");
const elForm = document.querySelector(".todo-form");
const elTextInp = document.querySelector(".todo-text");

function renderUsers(arr, node) {
    node.innerHTML = "";
    arr.forEach(item => {
        node.innerHTML += `
        <li class="user-list">
        <p class="fs-5 mb-0">${item.todo_value}</p>
        <button class="edit-btn" data-id="${item.id}">✏️</button>
        <button class="delete-btn" data-id="${item.id}">🗑</button>
        </li>
        `
    });
};


// Functions
async function postTodos() {
    try {
        const res = await fetch("http://localhost:5001/todo", {
        method: "POST",
        
        headers : {
            "Content-Type": "application/json",
            Authorization : loginToken,
        },
        body: JSON.stringify({
            text: elTextInp.value.trim(),
        })
    });
    
    const data = await res.json();
    console.log(data);
    
} catch (error) {
    console.log(error);
}
}

async function getTodos() {
    try {
        const res = await fetch("http://localhost:5001/todo", {
        headers: {
            Authorization : loginToken,
        }
    })
    
    const data = await res.json()
    renderUsers(data, elUsersList)
} catch (error) {
    console.log(error);
}
};

async function editTodos(id) {
    const newText = prompt("Edit todo title !")
    try {
        const res = await fetch(`http://localhost:5001/todo/${id}`, {
        method : "PUT",
        
        headers : {
            "Content-Type": "application/json",
            Authorization : loginToken,
        },
        
        body : JSON.stringify({
            text : newText,
        })
    })
    
    const data = await res.json()
    
    alert(data),
    
    getTodos()
} catch (error) {
    console.log(error);
}
}

async function deleteTodos(id) {
    try {
        const res = await fetch(`http://localhost:5001/todo/${id}`, {
        method : "DELETE",
        
        headers : {
            Authorization : loginToken,
        },
    })
    
    const data = await res.json()
    alert(data);

    getTodos()
} catch (error) {
    console.log(error);
}
}

// BTNS
elUsersList.addEventListener("click", evt => {
    if(evt.target.matches(".edit-btn")) {
        const editBtnId = evt.target.dataset.id;
        editTodos(editBtnId)
    }

    if(evt.target.matches(".delete-btn")) {
        const editBtnId = evt.target.dataset.id;
        deleteTodos(editBtnId)
    }
})

// Form
elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    
    postTodos();
    getTodos();
    elTextInp.value = "";
})

getTodos()