import { useEffect, useState } from "react"
import Post from "./post"

const Feed = ({loggedUser}: {loggedUser?: object}) => {
    const [postList, setPostList] = useState<any[]>([])

    useEffect(() => {
        console.log('carregar o feed do monstro')
        setPostList([
            {
                id: 1,
                user: {
                    id: 0,
                    name: 'Aspas',
                    avatar: null
                },
                image: 'https://www.sciencenews.org/wp-content/uploads/2022/11/Hubble-Pillars-of-Creation.jpg',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                likes: [],
                comments: [
                    {
                        userId: 10,
                        name: 'maridao',
                        avatar: null,
                        comment: 'muito brabo prc pprt'
                    }
                ]
            },
        ])
    }, [loggedUser])

    return (
        <div className="feedContainer desktopLarge">
            {postList.map((post: any) => (
                <Post key={post.id} {...post} loggedUser={loggedUser}/>
            ))}
        </div>
    )
}

export default Feed
