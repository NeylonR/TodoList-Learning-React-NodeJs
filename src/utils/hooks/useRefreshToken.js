import axios from "axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh');
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            return { ...prev, token: response.data.token }
        });
        return response.data.token;
    }
    return refresh;
}