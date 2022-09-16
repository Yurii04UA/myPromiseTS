const async = (generator) => {
    const g = generator();
  
    (function next(value) {
      console.log(value);
      const n = g.next(value);
      console.log(n.value);
      console.log(n);
      if (n.done) return;
      n.value.then(next);
    })();
  };
  
  async(function* () {
    const response = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = yield response.json();
    console.log(data);
  })