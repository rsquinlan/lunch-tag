import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/'

class AdminService {
    updateStrikes(matches) {
        return axios.post(API_URL + 'confirmMatches', 
        {matches: matches})
    }
}

export default new AdminService();