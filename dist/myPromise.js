"use strict";
class MyPromise {
    constructor(executor) {
        this.onResolved = () => { };
        this.onRejected = () => { };
        this.isCalled = false;
        this.isFulfilled = false;
        this.isRejected = false;
        this.value = '';
        this.error = '';
        return executor(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(data) {
        this.isFulfilled = true;
        this.value = data;
        // console.log(this.value);
        if (typeof this.onResolved === "function" && !this.isCalled) {
            this.onResolved(data);
            this.isCalled = true;
        }
    }
    reject(err) {
        this.isRejected = true;
        this.error = err;
        if (typeof this.onRejected === "function" && !this.isCalled) {
            this.onRejected(err);
            this.isCalled = true;
        }
        ;
    }
    ;
    then(thenHandler) {
        this.onResolved = thenHandler;
        if (!this.isCalled && this.isFulfilled) {
            this.onResolved(this.value);
        }
        ;
        return this;
    }
    ;
    catch(catchHandler) {
        this.onRejected = catchHandler;
        if (!this.isCalled && this.isRejected) {
            this.onRejected(this.error);
        }
        ;
        return this;
    }
    ;
    static resolve(value) {
        return new MyPromise((resolve) => {
            resolve(value);
        });
    }
    ;
    static reject(error) {
        return new MyPromise((resolve, reject) => {
            reject(error);
        });
    }
    ;
}
const aaa = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolve');
        // reject('reject');
        // reject(new Error("err")); // work as promise
    }, 1500);
    // resolve('resolved without async');
    // reject('rejected without async');
}).then((e) => console.log(e)).then((e) => console.log(e)).catch((err) => console.error(err));
// MyPromiseClass.resolve('sd').then(e => console.log('aa',e))
// MyPromise.resolve('aaaaa').then(e => console.log(e)).catch(e => console.error(e));
