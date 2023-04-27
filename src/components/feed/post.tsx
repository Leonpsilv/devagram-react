import Link from "next/link"
import Avatar from "../avatar"
import Image from "next/image"
import { useEffect, useState } from "react"

import likeImg from '../../../public/images/like.svg'
import likedImg from '../../../public/images/liked.svg'
import commentImg from '../../../public/images/grayComment.svg'
import activeCommentImg from '../../../public/images/activeComment.svg'
import WriteComment from "./writeComment"
import PostService from "@/services/PostService"

const descriptionLimit = 100
const postService = new PostService()

const Post = ({
    user,
    _id: postId,
    userId,
    image,
    likes,
    description,
    comments,
    loggedUser
}: any) => {
    const [descriptionView, setDescriptionView] = useState('')
    const [showMoreToggle, setShowMoreToggle] = useState(false)
    const [shortDescription, setShortDescription] = useState(true)
    const [moreOrLessMsg, setMoreOrLessMsg] = useState('mais')

    const [showCommentContainer, setShowCommentContainer] = useState(false)
    const [postComments, setPostComments] = useState(comments)
    const [postLikes, setPostLikes] = useState(likes)
    
    const cutDescription = description.slice(0, descriptionLimit) + '...'
    useEffect(() => {
        if(description.length < descriptionLimit){
            setDescriptionView(description)
        }else{
            setDescriptionView(cutDescription)
            setShowMoreToggle(true)
            setShortDescription(false)
        }
        setMoreOrLessMsg('mais')
    }, [])

    function showDescription () {
        if(!showMoreToggle){
            setDescriptionView(cutDescription)
            setMoreOrLessMsg('mais')
            setShowMoreToggle(true)
            return
        }
        setDescriptionView(description)
        setShowMoreToggle(false)
        setMoreOrLessMsg('menos')
    }

    function getCommentImg () {
        return showCommentContainer ?  activeCommentImg
        : commentImg
    }

    async function publishComment (comment: string) {
        try {
            await postService.commentPost({comment}, postId)
            setPostComments([
                ...postComments,
                {
                    userId: loggedUser.id,
                    name: loggedUser.name,
                    avatar: loggedUser.avatar,
                    comment
                },
            ])
            return true
        } catch (e: any) {
            alert('falha ao publicar comentario! ' + (e?.response?.data?.error || ''))
            return false
        }
    }

    function getLikeImg() {
        const liked = postLikes.indexOf(loggedUser.id)
        return liked === -1 ? likeImg
        : likedImg
    }

    async function changeLike () {
        try {
            await postService.likeOrUnlikePost(postId)
            const liked = postLikes.includes(loggedUser.id)
            if(!liked){
                setPostLikes([...postLikes, loggedUser.id])
            }else{
                setPostLikes(postLikes.filter((userLike: string) => userLike !== loggedUser.id))
            }
        } catch (e: any) {
            alert('falha alterar curtida! ' + (e?.response?.data?.error || ''))
        }
    }

    return (
        <div className="post">
            <Link href={`/perfil/${userId}`}>
                <section className="postHeader">
                    <Avatar src={user?.avatar} />
                    <strong>{user?.name}</strong>
                </section>
            </Link>
            <div className="postImage">
                <img src={image} alt={`foto do post`}/>
            </div>

            <div className="postFooter">
                <div className="actionsPostFooter">
                    <Image
                        src={getLikeImg()}
                        alt="icone curtir"
                        width={20}
                        height={20}
                        onClick={changeLike}
                    />
                    <Image
                        src={getCommentImg()}
                        alt="icone comentar"
                        width={18}
                        height={18}
                        onClick={() => setShowCommentContainer(!showCommentContainer)}
                    />

                    <span className="quantityLikes">
                        Curtido por <strong>{postLikes.length}</strong> pessoas.
                    </span>
                </div>

                <div className="descriptionPostFooter">
                    <strong className="userName">{user?.name}</strong>
                    <p className="description">
                        {descriptionView}
                        {!shortDescription && <span className="showMore" onClick={() => showDescription()}>{moreOrLessMsg}</span>}
                    </p>
                </div>

                <div className="commentsPostFooter">
                    {postComments.map((comment: any, index: number) => (
                        <div className="comment" key={index}>
                            <strong className="userName">{comment.name}</strong>
                            <p className="description">
                                {comment.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {showCommentContainer && <WriteComment loggedUser={loggedUser} publishComment={publishComment}/>}
        </div>
    )
}

export default Post
