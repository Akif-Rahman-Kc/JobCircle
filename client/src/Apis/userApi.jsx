import { UserApi } from "@/constants/Constant"

/////////////////////////////////////////////////////////////////////////////

export const SignupApi = async (formData,firebaseToken) => {
    try {
        const {data} = await UserApi.post('/signup', formData, {headers:{"firebasetoken":firebaseToken}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SigninApi = async (formData) => {
    try {
        const {data} = await UserApi.post('/signin', formData)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const isAuthApi = async (Token) => {
    try {
        const {data} = await UserApi.post('/userAuth',{}, {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetJobs = async (Token) => {
    try {
        const {data} = await UserApi.get('/get_jobs', {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetWorkers = async (jobName) => {
    try {
        const {data} = await UserApi.get(`/get_workers?jobName=${jobName}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfileEdit = async (userId , formData, Token) => {
    try {
        const {data} = await UserApi.put(`/edit_profile?userId=${userId}`, formData , {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ProfilePhotoRemove = async (userId, Token) => {
    try {
        const {data} = await UserApi.patch(`/remove_profile_photo?userId=${userId}` , {} , {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SavedVendors = async (vendorId, userId, Token) => {
    try {
        const {data} = await UserApi.patch(`/saved_vendors?vendorId=${vendorId}&&userId=${userId}` , {} , {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const UserGetAllPosts = async (Token) => {
    try {
        const {data} = await UserApi.get('/get_all_posts', {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const SearchAllPeople = async (word) => {
    try {
        const {data} = await UserApi.get(`/search?vlaue=${word}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ConnectWithPeople = async (userId,followingId) => {
    try {
        const {data} = await UserApi.patch(`/connect?userId=${userId}&&followingId=${followingId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const getAllConnectors = async (userId) => {
    try {
        const {data} = await UserApi.get(`/get_all_connectors?userId=${userId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetChats = async (userId) => {
    try {
        const {data} = await UserApi.get(`/get_chats?userId=${userId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AddChat = async (ids) => {
    try {
        const {data} = await UserApi.post('/create_chat', ids)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetUser = async (userId, chatId) => {
    try {
        const {data} = await UserApi.get(`/get_user?userId=${userId}&&chatId=${chatId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetMessages = async (chatId, userId) => {
    try {
        const {data} = await UserApi.get(`/get_messages?chatId=${chatId}&&userId=${userId}`)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AddMessage = async (message) => {
    try {
        const {data} = await UserApi.post('/add_message' , message)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const Booking = async (bookingDetails, vendorId, userId) => {
    try {
        const {data} = await UserApi.post(`/add_booking?vendorId=${vendorId}&&userId=${userId}` , bookingDetails)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const ReportVendor = async (message,vendorId,reporterId) => {
    try {
        const {data} = await UserApi.patch('/report_vendor',{message,vendorId,reporterId})
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const AddNotification = async (formData) => {
    try {
        const {data} = await UserApi.post('/add_notification',formData)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetNotifications = async (userId) => {
    try {
        const {data} = await UserApi.get(`/get_notifications?userId=${userId}`)
        return data;
    } catch (error) {
        return false
    }
}

// /////////////////////////////////////////////////////////////////////////////

// export const GetUserBookings = async (userId) => {
//     try {
//         const {data} = await UserApi.get(`/get_user_bookings?userId=${userId}`)
//         return data;
//     } catch (error) {
//         return false
//     }
// }