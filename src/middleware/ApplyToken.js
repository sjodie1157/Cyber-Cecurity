import axios from 'axios'

function applyToken(token) {
    if (token) {
        axios.defaults.headers = {
            authorization: `${token}`
        }
    }
}

export default {
    applyToken
}