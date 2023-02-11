import { Api } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const SignupApi = async (formData) => {
    try {
        const {data} = await Api.post('/signup', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SigninApi = async (formData) => {
    try {
        const {data} = await Api.post('/signin', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isAuthApi = async (Token) => {
    try {
        const {data} = await Api.post('/userAuth', {headers:{"accessToken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetJobs = async () => {
    try {
        const {data} = await Api.get('/get_jobs')
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetWorkers = async (jobId) => {
    try {
        const {data} = await Api.get(`/get_workers?jobId=${jobId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfileEdit = async (userId , formData) => {
    try {
        const {data} = await Api.put(`/edit_profile?userId=${userId}`, formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfilePhotoRemove = async (userId) => {
    try {
        const {data} = await Api.patch(`/remove_profile_photo?userId=${userId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SavedVendors = async (vendorId, userId) => {
    try {
        const {data} = await Api.patch(`/saved_vendors?vendorId=${vendorId}&&userId=${userId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}