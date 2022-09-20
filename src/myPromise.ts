class MyPromise {
    onResolved: Function = () => { };
    onRejected: Function = () => { };
    isCalled: boolean = false;
    isFulfilled: boolean = false;
    isRejected: boolean = false;
    value: string | number = '';
    error: string | number = '';
    constructor(executor: Function) {
        return executor(this.resolve.bind(this), this.reject.bind(this))
    };

    resolve(data: number | string) {
        this.isFulfilled = true;
        this.value = data;
        // console.log(this.value);
        if (typeof this.onResolved === "function" && !this.isCalled) {
            this.onResolved(data);
            this.isCalled = true;
        };
    };

    reject(err: number | string) {
        this.isRejected = true;
        this.error = err;
        if (typeof this.onRejected === "function" && !this.isCalled) {
            this.onRejected(err);
            this.isCalled = true;
        };
    };

    then(thenHandler: Function) {
        this.onResolved = thenHandler;
        if (!this.isCalled && this.isFulfilled) {
            this.onResolved(this.value);
        };
        return this;
    };

    catch (catchHandler: Function) {
        this.onRejected = catchHandler;
        if (!this.isCalled && this.isRejected) {
            this.onRejected(this.error);
        };
        return this;
    };
    static resolve(value: string | number) {
        return new MyPromise((resolve: Function) => {
            resolve(value);
        });
    };
    static reject(error: string | number) {
        return new MyPromise((resolve: Function, reject: Function) => {
            reject(error)
        });
    };
};

const aaa = new MyPromise((resolve: Function, reject: Function) => {
    setTimeout(() => {
        resolve('resolve');
        // reject('reject');
        // reject(new Error("err")); // work as promise
    }, 1500)
    // resolve('resolved without async');
    // reject('rejected without async');
}).then((e: any) => console.log(e)).then((e: any) => console.log(e)).catch((err: any) => console.error(err))

// MyPromiseClass.resolve('sd').then(e => console.log('aa',e))


// MyPromise.resolve('aaaaa').then(e => console.log(e)).catch(e => console.error(e));
