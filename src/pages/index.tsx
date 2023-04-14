import { useEffect, useState } from "react";
import Login from "@/components/login";
import UserService from "@/services/UserService";
import Home from "@/components/home";

const userService = new UserService()
export default function Index() {
  const [authenticate, setAuthenticate] = useState(false)
  useEffect(()=> {
    setAuthenticate(userService.isAuthenticate())
  }, [])

  if(authenticate) return <Home />
  return (
    <>
      <Login afterAuthenticate={() => setAuthenticate(true)}/>
    </>
  )
}
