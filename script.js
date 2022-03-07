//Симулятор муравейника

let listClass = ['Ant', 'Model', 'View', 'Control', 'Main'];

for (let name of listClass) {
    let script = document.createElement('script');
    script.src = 'JS/'+name+'.js';
    script.type = 'application/javascript';
    document.body.appendChild(script);
}