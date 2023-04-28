import Feed from "@/components/feed"
import withAuthorization from "@/hoc/withAuthorization"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProfileHeader from "@/components/profileHeader"
import UserService from "@/services/UserService"

const userService = new UserService()

const Profile = ({loggedUser}: any) => {
   const [user, setUser] = useState<any>({})
   const router = useRouter()

   async function getProfile(userId: string | string[] | undefined) {
      try {
         const {data} = await userService.getProfileData(userId === 'eu' ? loggedUser.id : userId)
         return data
      } catch (error) {
         alert('Falha ao buscar dados do usuário! ')
      }

   }
   useEffect(() => {
      async function request() {
         if(!router.query.id) return

         const profileData = await getProfile(router.query.id)
         setUser(profileData)
      }
      request()
   }, [router.query.id])

   return (
    <div className="profilePage">
      <ProfileHeader loggedUser={loggedUser} profileUser={user}/>
      
      <Feed loggedUser={loggedUser} profileData={user}/>
    </div>
   ) 
}

export default withAuthorization(Profile)