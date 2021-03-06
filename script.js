//Симулятор муравейника

var model, view, control;

let listClass = [
    'AI',
    'Action',
    'Ant',
    'Colony',
    'Items',
    'Model',
    'View',
    'Control'
];

for (let name of listClass) {
    let script = document.createElement('script');
    script.src = 'JS/'+name+'.js';
    script.type = 'application/javascript';
    document.body.appendChild(script); 
}

let listLib = [
    'FileSaver.js'
];

for (let name of listLib) {
    let script = document.createElement('script');
    script.src = 'Libs/'+name;
    script.type = 'application/javascript';
    document.body.appendChild(script); 
}

window.onload = () => {
    model = new Model();
    view = new View();
    control = new Control();
}