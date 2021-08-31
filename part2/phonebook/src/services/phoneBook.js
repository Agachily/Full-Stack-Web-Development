import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const sendData = (sendData) => {
    return axios.post(baseurl, sendData)
}

export default{sendData}