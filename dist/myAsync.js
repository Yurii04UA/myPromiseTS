"use strict";
const async = (generator) => {
    const g = generator();
    (function next(value) {
        const n = g.next(value);
        if (n.done)
            return;
        n.value.then(next);
    })();
};
async(function* () {
    const response = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = yield response.json();
    console.log(data);
});
