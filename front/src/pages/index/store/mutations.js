
export default {
    SET_PARAM(state, data) {
        Object.keys(data).map( key => {
            state[key] = data[key]
        })
    }
}