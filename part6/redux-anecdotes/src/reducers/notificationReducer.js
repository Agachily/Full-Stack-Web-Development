const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'NEW_NOTFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

const addNotification = (content) => {
    return {
        type : "NEW_NOTFICATION",
        data : content
    }
}

const removeNotification = () => {
    return {
        type : "REMOVE_NOTIFICATION"
    }
}

export default notificationReducer
export {addNotification, removeNotification}