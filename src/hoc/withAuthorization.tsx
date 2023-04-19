import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import UserService from "@/services/UserService"
import { useRouter } from "next/router"

const userService = new UserService()

type typeLoggedUser = {
    id: string | null,
    name: string | null,
    avatar?: string | null,
    email: string | null
}

const withAuthorization = (Component : React.FC) => {
    return (props?: any) => {
        if(typeof window !== 'undefined') {
            const router = useRouter()
            if(!userService.isAuthenticate()){
                router.replace('/')
                return null
            }
            
            const loggedUser : typeLoggedUser = userService.getLoggedUserInfo()
            return (
                <>
                  <Header loggedUser={loggedUser} />  
                  <Component loggedUser={loggedUser} {...props} />
                  <Footer loggedUser={loggedUser} />
                </>
            ) 
        }

        return null
    }
}

export default withAuthorization