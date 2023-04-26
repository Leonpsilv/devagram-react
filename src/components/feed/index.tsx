import { useEffect, useState } from "react"
import Post from "./post"
import PostService from "@/services/PostService"

const postService = new PostService()

const Feed = ({loggedUser}: {loggedUser?: object}) => {
    const [postList, setPostList] = useState<any[]>([])

    useEffect(() => {
        async function asyncFunction() {
            const {data} = await postService.postsLoad()
            setPostList(data)

        }
        asyncFunction()
    }, [loggedUser])

    return (
        <div className="feedContainer desktopLarge">
            {postList.map((post: any) => (
                <Post key={post._id} {...post} loggedUser={loggedUser}/>
            ))}
        </div>
    )
}

export default Feed
