import { Api } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const VendorSignupApi = async (formData) => {
    try {
        const {data} = await Api.post('/vendor/signup', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorSigninApi = async (formData) => {
    try {
        const {data} = await Api.post('/vendor/signin', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorisAuthApi = async (Token) => {
    try {
        const {data} = await Api.post('/vendor/vendorAuth', {headers:{"accessVendorToken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorAddPost = async (formData) => {
    try {
        const {data} = await Api.post('/vendor/add_post', formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorGetPosts = async (vendorId) => {
    try {
        const {data} = await Api.get(`/vendor/get_posts?vendorId=${vendorId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorProfileEdit = async (vendorId , formData) => {
    try {
        const {data} = await Api.put(`/vendor/edit_profile?vendorId=${vendorId}`, formData)
        return data;
    } catch (error) {
        console.log(error);
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfilePhotoRemove = async (vendorId) => {
    try {
        const {data} = await Api.patch(`/vendor/remove_profile_photo?vendorId=${vendorId}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}