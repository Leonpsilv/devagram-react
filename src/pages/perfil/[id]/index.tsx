import AlternativeHeader from "@/components/alternativeHeader"
import Feed from "@/components/feed"
import withAuthorization from "@/hoc/withAuthorization"
import leftArrowImg from '../../../../public/images/leftArrow.svg'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Profile = ({loggedUser}: any) => {
   const [user, setUser] = useState({})
   const router = useRouter()

   useEffect(() => {
      async function request() {
         
      }
      request()
   }, [])
   return (
    <div className="profilePage">
      <AlternativeHeader leftIcon={leftArrowImg}/>
      <Feed loggedUser={loggedUser}/>
    </div>
   ) 
}

export default withAuthorization(Profile)