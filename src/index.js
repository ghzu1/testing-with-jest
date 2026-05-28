import * as stack from './stack.js';

window.onload = function () {
    var pop = document.getElementById('pop');
    var push = document.getElementById('push');
    var peek = document.getElementById('peek');
    var display = document.getElementById('top_of_stack');

    pop.addEventListener("click", function() {
    var removed = stack.pop();
    alert("Tog bort " + removed);

    var newTop = stack.peek();

    if (newTop === undefined) {
        display.innerHTML = "n/a";
    } else {
        display.innerHTML = newTop;
    }
});

    push.addEventListener("click", function() {
        var x = prompt("Vad ska vi lägga på stacken?");
        stack.push(x);
        display.innerHTML = x;
    });

    peek.addEventListener("click", function() {
        display.innerHTML = stack.peek();
    });
};