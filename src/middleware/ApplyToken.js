import axios from 'axios'

function applyToken(token) {
    if (token) {
        axios.defaults.headers = {
            authorization: `${token}`
        }
    } else {
        console.error('Something went wrong with token');
    }
}

export default {
    applyToken
}