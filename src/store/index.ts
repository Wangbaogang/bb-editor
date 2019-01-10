import Store from './store'

function createStore(props: any) {
    return new Store(props)
}

export default createStore