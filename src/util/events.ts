
type Icallback = (options?: any) => any

interface IEventsStorage {
    [propName: string]: Icallback[]
}
interface IEventBus {
    __storage: IEventsStorage
}

const eventBus: IEventBus = {
    __storage: {},
    off,
    on,
    trigger
}

interface IEventBus {
    on: (eventName: string, callback: Icallback) => IEventBus
    off: (eventName: string, callback: Icallback) => IEventBus
    trigger: (eventName: string, options: any) => IEventBus
}

function on(this: IEventBus, eventName: string, callback: Icallback) {
    const storage = this.__storage
    const callbackList = storage[eventName] || (storage[eventName] = [])
    callbackList.push(callback)
    return this
}

function off(this: IEventBus, eventName: string, callback?: Icallback) {
    const storage = this.__storage
    const callbackList = storage[eventName] || (storage[eventName] = [])
    if (!callback) {
        storage[eventName] = []
    } else {
        storage[eventName] = callbackList.filter(item => item !== callback)
    }
    return this
}

function trigger(this: IEventBus, eventName: string, options?: any) {
    const storage = this.__storage
    const callbackList = storage[eventName] || (storage[eventName] = [])
    callbackList.forEach(callback => callback(options))
    return this
}

export default eventBus
