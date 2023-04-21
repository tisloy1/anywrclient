import * as api from '../api'

export const verifyUser = async () => {
    try {
        const {data} = await api.verifyUser();
        return data;
    } catch(error) {
        console.log(error)
    }
}
export const logOut = async () => {
    try {
        const {data} = await api.logOut();
        return data;
    } catch(error) {
        console.log(error)
    }
}
export const login = async (user) => {
    try {
        const {data} = await api.login(user);
        console.log(data);
        return data;
    } catch(error) {
        console.log(error)
    }
}
export const signup = async (user) => {
    try {
        const {data} = await api.signup(user);
        return data;
    } catch(error) {
        console.log(error)
    }
}


export const getUser = async (id) => {
    try {
        const {data} = await api.getUser(id);
        return data;
    } catch(error) {
        console.log(error)
    }
}

