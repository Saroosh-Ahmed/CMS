import axios from "axios";
import constants from "./constants";

const instance = axios.create({
    baseURL: constants.BaseUrl,
    timeout: 1000,
    headers: {'content-type': 'application/json'}
});

export const getUsers = () => instance.get(constants.endpoints.getCustomers)
export const createUsers = (data) => instance.post(constants.endpoints.createCustomers, data)
export const editUsers = (data) => instance.post(constants.endpoints.updateCustomers, data)
export const deleteUsers = (data) => instance.delete(constants.endpoints.deleteCustomers, {data})