import { Api } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const AdminSigninApi = async (formData) => {
    try {
        const {data} = await Api.post('/admin/signin', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AdminisAuthApi = async (Token) => {
    try {
        const {data} = await Api.post('/admin/adminAuth', {headers:{"accessAdminToken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AdminGetUsers = async () => {
    try {
        const {data} = await Api.get('/admin/get_users')
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AdminGetVendors = async () => {
    try {
        const {data} = await Api.get('/admin/get_vendors')
        return data;
    } catch (error) {
        console.log(error);
    }
}