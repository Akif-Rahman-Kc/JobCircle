import { AdminApi } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const AdminSigninApi = async (formData) => {
    try {
        const {data} = await AdminApi.post('/signin', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AdminisAuthApi = async (Token) => {
    try {
        const {data} = await AdminApi.post('/adminAuth',{}, {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AdminGetUsers = async (Token) => {
    try {
        const {data} = await AdminApi.get('/get_users', {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AdminGetVendors = async (Token) => {
    try {
        const {data} = await AdminApi.get('/get_vendors', {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isBlocked = async (userId, Token) => {
    try {
        const {data} = await AdminApi.patch(`/user_blocked?userId=${userId}`, {} , {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isActivated = async (userId, Token) => {
    try {
        const {data} = await AdminApi.patch(`/user_actived?userId=${userId}`, {} , {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isVendorBlocked = async (vendorId, Token) => {
    try {
        const {data} = await AdminApi.patch(`/vendor_blocked?vendorId=${vendorId}`, {} , {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isVendorActivated = async (vendorId, Token) => {
    try {
        const {data} = await AdminApi.patch(`/vendor_actived?vendorId=${vendorId}`, {} , {headers:{"admintoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}