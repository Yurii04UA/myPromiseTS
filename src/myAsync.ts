type IInterface ={
    json(): string;
    userId:number,
    id:number,
    title:string,
    completed:boolean
  }

const async = (generator: Function ) => {
    const g = generator();
  
    (function next(value) {
      const n = g.next(value);
      if (n.done) return;
      n.value.then(next);
    })();
  };

  async(function* () {
    const response: IInterface= yield fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data: string = yield response.json();
    console.log(data);
  })