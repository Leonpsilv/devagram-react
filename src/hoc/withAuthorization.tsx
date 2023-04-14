import UserService from "@/services/UserService"
import { useRouter } from "next/router"

const userService = new UserService()
const withAuthorization = (Component : React.FC) => {
    return (props?: any) => {
        if(typeof window !== 'undefined') {
            const router = useRouter()
            if(!userService.isAuthenticate()){
                router.replace('/')
                return null
            }
            return <Component {...props} />
        }

        return null
    }
}

export default withAuthorization