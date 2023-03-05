import { VendorApi } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const VendorSignupApi = async (formData, firebaseToken) => {
    try {
        const {data} = await VendorApi.post('/signup', formData, {headers:{"firebasetoken":firebaseToken}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorSigninApi = async (formData) => {
    try {
        const {data} = await VendorApi.post('/signin', formData)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorisAuthApi = async (Token) => {
    try {
        const {data} = await VendorApi.post('/vendorAuth',{}, {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorAddPost = async (formData, Token) => {
    try {
        const {data} = await VendorApi.post('/add_post', formData , {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorGetPosts = async (vendorId, Token) => {
    try {
        const {data} = await VendorApi.get(`/get_posts?vendorId=${vendorId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorProfileEdit = async (vendorId , formData, Token) => {
    try {
        const {data} = await VendorApi.put(`/edit_profile?vendorId=${vendorId}`, formData , {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorProfilePhotoRemove = async (vendorId, Token) => {
    try {
        const {data} = await VendorApi.patch(`/remove_profile_photo?vendorId=${vendorId}` , {} , {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetAllPosts = async (Token) => {
    try {
        const {data} = await VendorApi.get('/get_all_posts', {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorGetJobs = async (Token) => {
    try {
        const {data} = await VendorApi.get('/get_jobs', {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const LikedPost = async (postId, likerId) => {
    try {
        const {data} = await VendorApi.patch(`/liked_post?postId=${postId}&&likerId=${likerId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AddCommnet = async (comment) => {
    try {
        const {data} = await VendorApi.patch('/add_comment', comment)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const DeleteComment = async (postId, commentId) => {
    try {
        const {data} = await VendorApi.patch(`/delete_comment?postId=${postId}&&commentId=${commentId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const EditPost = async (formData) => {
    try {
        const {data} = await VendorApi.patch('/edit_post', formData)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const DeletePost = async (postId) => {
    try {
        const {data} = await VendorApi.delete(`/delete_post?postId=${postId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ReportPost = async (message,postId,reporterId) => {
    try {
        const {data} = await VendorApi.patch('/report_post',{message,postId,reporterId})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorSearchAllPeople = async (word) => {
    try {
        const {data} = await VendorApi.get(`/search?vlaue=${word}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const VendorGetAllConnectors = async (userId) => {
    try {
        const {data} = await VendorApi.get(`/get_all_connectors?userId=${userId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetBookings = async (vendorId, Token) => {
    try {
        const {data} = await VendorApi.get(`/get_bookings?vendorId=${vendorId}`, {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AcceptBooking = async (vendorId, bookingId, Token) => {
    try {
        const {data} = await VendorApi.patch(`/accept_booking?vendorId=${vendorId}&&bookingId=${bookingId}`, {} , {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const DeclineBooking = async (vendorId, bookingId, Token) => {
    try {
        const {data} = await VendorApi.patch(`/decline_booking?vendorId=${vendorId}&&bookingId=${bookingId}`, {} , {headers:{"vendortoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetBookingDates = async (vendorId) => {
    try {
        const {data} = await VendorApi.get(`/get_booking_dates?vendorId=${vendorId}`)
        return data;
    } catch (error) {
        return false
    }
}