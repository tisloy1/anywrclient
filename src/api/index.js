import axios from 'axios'
export const endpoint = 'http://localhost:5000/';
axios.defaults.withCredentials = true;

const config = {
    withCredentials : true,
    headers:{
        'content-Type': 'application/json',
    }
};

export const verifyUser =  () => axios.get(endpoint+'verifyuser', config)
export const logOut =  () => axios.get(endpoint+'logout', config)
export const login =  (user) => axios.post(endpoint+'login', user, config)
export const signup =  (user) => axios.post(endpoint+'signup', user, config)
export const getUser = (id) => axios.get(endpoint+'getuser/'+id, config)