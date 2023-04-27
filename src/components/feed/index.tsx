import { useEffect, useState } from "react"
import Post from "./post"
import PostService from "@/services/PostService"

const postService = new PostService()

const Feed = ({
    loggedUser,
    profileData
}: {
    loggedUser?: object,
    profileData?: any
}) => {
    const [postList, setPostList] = useState<any[]>([])

    useEffect(() => {
        async function asyncFunction() {
            const {data} = await postService.postsLoad(profileData?._id)
            
            const formatedPosts = data.map((post: any) => (
                {
                    _id: post._id,
                    userId: post.userId,
                    description: post.description,
                    image: post.image,
                    likes: post.likes,
                    comments: post.comments.map((c: any) => ({
                        userId: c.userId,
                        name: c.name,
                        comment: c.comment,
                        avatar: c.avatar
                    })),
                    user: {
                        name: profileData?.name || post?.user?.name,
                        avatar: profileData?.avatar || post?.user?.avatar
                    }
                }
            ))
            setPostList(formatedPosts)

        }
        asyncFunction()
    }, [loggedUser, profileData])

    return (
        <div className="feedContainer desktopLarge">
            {postList.map((post: any) => (
                <Post key={post._id} {...post} loggedUser={loggedUser}/>
            ))}
        </div>
    )
}

export default Feed
