import axios from 'axios'

const API_URL = 'http://localhost:8080/api/employees'

const getEmployees = async () => {
    return await axios.get(`${API_URL}/get-all`)
}

const createEmployees = (employees) => {
    return axios.post(`${API_URL}/create`, employees)
}

const updateEmployees = async (employees) => {
    return await axios.put(`${API_URL}/update`, employees)
}

const deleteEmployees = (ids) => {
    return axios.delete(`${API_URL}/delete`, { data: ids })
}

export { getEmployees, updateEmployees, deleteEmployees, createEmployees };