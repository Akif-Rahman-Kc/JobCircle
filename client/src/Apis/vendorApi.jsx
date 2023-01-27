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
        const {data} = await Api.post('/vendor/userAuth', {headers:{"accessVendorToken":Token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}