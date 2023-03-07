import axios from "axios";

export const UserApi = axios.create({baseURL:'https://api.dorlaro.shop/api/'})
export const VendorApi = axios.create({baseURL:'https://api.dorlaro.shop/api/vendor/'})
export const AdminApi = axios.create({baseURL:'https://api.dorlaro.shop/api/admin/'})