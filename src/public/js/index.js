const socket = io();

socket.emit('message', "Comunicacion desde web Socket!");

socket.on('productAdded', product => {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.textContent = product.title;
    ul.appendChild(li);
});


