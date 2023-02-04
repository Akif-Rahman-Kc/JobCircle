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