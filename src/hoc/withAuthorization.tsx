import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
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
            return (
                <>
                  <Header />  
                  <Component {...props} />
                  <Footer />
                </>
            ) 
        }

        return null
    }
}

export default withAuthorization