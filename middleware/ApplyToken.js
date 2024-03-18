import axios from 'axios'

applyToken = (token) => {
    if (token) {
        axios.defaults.headers = {
            authorization: `${token}`
        }
    }
}

export default {
    applyToken
}