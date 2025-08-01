const storeInSession = (key, value) => {
    sessionStorage.setItem(key, value)
}

const lookInSession = (key) => {
    return sessionStorage.getItem(key)
}

const removeFromSession = (key) => {
    return sessionStorage.removeItem(key)
}

const logOutUser = (key) => {
    return sessionStorage.clear(key)
}

export { storeInSession, lookInSession, removeFromSession, logOutUser }