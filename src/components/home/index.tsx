import withAuthorization from "@/hoc/withAuthorization"
import Feed from "../feed"


const Home = ({loggedUser}: { loggedUser?:  object}) => {
    return (
        <Feed loggedUser={loggedUser}/>
    )
}

export default withAuthorization(Home)