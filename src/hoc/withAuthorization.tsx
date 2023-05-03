import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Loading from "@/components/loading"
import UserService from "@/services/UserService"
import { useRouter } from "next/router"

const userService = new UserService()

type typeLoggedUser = {
    id: string | null,
    name: string | null,
    avatar?: string | null,
    email: string | null
}

function WithAuthorization (Component: any) {
    
    return function Authorization (props?: any) {
        const router = useRouter()

        if (typeof window !== 'undefined') {
            if (!userService.isAuthenticate()) {
                router.replace('/')
                return <></>
            }

            const loggedUser: typeLoggedUser = userService.getLoggedUserData()
            return (
                <>
                    <Header loggedUser={loggedUser} />
                    <Loading />
                    <Component loggedUser={loggedUser} {...props} />
                    <Footer loggedUser={loggedUser} />
                </>
            )
        }

        return <></>
    }
}

export default WithAuthorization