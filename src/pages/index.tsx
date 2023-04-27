import { useEffect, useState } from "react";
import Login from "@/components/login";
import UserService from "@/services/UserService";
import Home from "@/components/home";

const userService = new UserService()
export default function Index() {
  const [authenticate, setAuthenticate] = useState<any>(null)
  useEffect(()=> {
    setAuthenticate(userService.isAuthenticate())
  }, [])

  if (authenticate === null) return null;

  if(authenticate) return <Home />
  
  return <Login afterAuthenticate={() => setAuthenticate(true)}/>
}
