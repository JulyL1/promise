const isFunction = (fn) => {
    return typeof fn === 'function'
}
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// const ifFunction = fn => typeof fn === 'function'

class myPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error(
                'please enter a function as parameter'
            )
        }
        this._status = PENDING
        this._value = undefined
        this._fulfilledQueues = []
        this._rejectedQueues = []

        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            this._reject(e)
        }
    }

    _resolve(val) {

        if (this._status != PENDING) return;
        const run = () => {

            this._status = FULFILLED
            this._value = val
            let cb
            while (cb = this._fulfilledQueues.shift()) {
                cb(val)
            }
        }
        setTimeout(() => {
            run()
        }, 0)

    }

    _reject(err) {
        if (this._status != PENDING) return;
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        if (val instanceof MyPromise) {
            val.then(value => {
                this._value = value
                this._status = FULFILLED
                runFulfilled(value)
            }, err => {
                this._value = err
                this._status = REJECTED
                runRejected(err)
            })
        } else {
            this._value = val
            this._status = FULFILLED
            runFulfilled(val)
        }

        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }


    then(onFulfilled, onRejected) {
        const {_value, _status} = this
        switch (_status) {
            case  PENDING:
                this._fulfilledQueues.push(onFulfilled)
                this._rejectedQueues.push(onRejected)
                break
            case FULFILLED:
                onFulfilled(_value)
                break
            case REJECTED:
                onRejected(_value)
        }
        // 返回一个新的Promise对象
        return new myPromise((onFulfilledNext, onRejectedNext) => {
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value)
                        if (res instanceof myPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onFulfilledNext(res)
                        }
                    }
                } catch (e) {
                    onRejectedNext(e)
                }
            }
            let rejected = value => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(value)
                    } else {
                        let res = onRejected(value)
                        if (res instanceof myPromise) {
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            onRejectedNext(res)
                        }
                    }
                } catch (e) {
                    onRejectedNext(e)
                }
            }
            switch (_status) {
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }

        })
    }


}
