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
        const {data} = await Api.post('/admin/userAuth', {headers:{"accessAdminToken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}