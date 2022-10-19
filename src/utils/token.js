export const setToken = (token) => {
    //持久化存储token
    localStorage.setItem("TOKEN", token)
}

export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}