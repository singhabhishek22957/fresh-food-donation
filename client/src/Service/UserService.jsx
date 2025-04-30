import axios from "axios";
const userService = axios.create({
    baseURL:`${
        import.meta.env.VITE_BACKEND_BASE_URL
    }${
        import.meta.env.VITE_BACKEND_USER_URL
    }`,
});

export const userTesting = async ()=>{
    const response = await userService.post('/testing',{
        withCredentials: true,
    })

    return response
}

