const storeInSession = (key, value) => {
    sessionStorage.setItem(key, value)
}

const lookInSession = (key) => {
    return sessionStorage.getItem(key)
}

const removeFromSession = (key) => {
    return sessionStorage.clear(key)
}

const logOutUser = () => {
    return sessionStorage.clear()
}

export { storeInSession, lookInSession, removeFromSession, logOutUser }