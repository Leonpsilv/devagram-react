import withAuthorization from "@/hoc/withAuthorization"

const Profile = () => {
   return (
    <h1> Perfil do monstro </h1>
   ) 
}

export default withAuthorization(Profile)