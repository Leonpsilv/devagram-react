import Feed from "@/components/feed"
import withAuthorization from "@/hoc/withAuthorization"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProfileHeader from "@/components/profileHeader"

const Profile = ({loggedUser}: any) => {
   const [user, setUser] = useState({})
   const router = useRouter()

   useEffect(() => {
      async function request() {
         setUser({name: 'Leonardo Pinheiro Guedes'})
      }
      request()
   }, [router.query.id])

   return (
    <div className="profilePage">
      <ProfileHeader loggedUser={loggedUser} profileUser={user}/>
      
      <Feed loggedUser={loggedUser}/>
    </div>
   ) 
}

export default withAuthorization(Profile)