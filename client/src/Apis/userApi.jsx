import { UserApi } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const SignupApi = async (formData) => {
    try {
        const {data} = await UserApi.post('/signup', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SigninApi = async (formData) => {
    try {
        const {data} = await UserApi.post('/signin', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isAuthApi = async (Token) => {
    try {
        const {data} = await UserApi.post('/userAuth',{}, {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetJobs = async (Token) => {
    try {
        const {data} = await UserApi.get('/get_jobs', {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetWorkers = async (jobId) => {
    try {
        const {data} = await UserApi.get(`/get_workers?jobId=${jobId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfileEdit = async (userId , formData, Token) => {
    try {
        const {data} = await UserApi.put(`/edit_profile?userId=${userId}`, formData , {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfilePhotoRemove = async (userId, Token) => {
    try {
        const {data} = await UserApi.patch(`/remove_profile_photo?userId=${userId}` , {} , {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SavedVendors = async (vendorId, userId, Token) => {
    try {
        const {data} = await UserApi.patch(`/saved_vendors?vendorId=${vendorId}&&userId=${userId}` , {} , {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const UserGetAllPosts = async (Token) => {
    try {
        const {data} = await UserApi.get('/get_all_posts', {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}