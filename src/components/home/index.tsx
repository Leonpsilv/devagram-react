import withAuthorization from "@/hoc/withAuthorization"

const Home = () => {
    return (
        <h1>Home</h1>
    )
}

export default withAuthorization(Home)