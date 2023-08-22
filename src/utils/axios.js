import Axios from "axios";

const axios = Axios.create({
    baseURL: `${window.location.protocol || 'https:'}//${window.location.hostname}:3001`, headers: {
        "Content-Type": 'application/json'
    },
    withCredentials: true
});

export default axios;