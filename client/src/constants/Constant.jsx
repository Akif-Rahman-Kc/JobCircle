import axios from "axios";

export const UserApi = axios.create({baseURL:'http://localhost:4000'})
export const VendorApi = axios.create({baseURL:'http://localhost:4000/vendor'})
export const AdminApi = axios.create({baseURL:'http://localhost:4000/admin'})