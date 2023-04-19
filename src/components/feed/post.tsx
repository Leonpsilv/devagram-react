import Link from "next/link"
import Avatar from "../avatar"
import Image from "next/image"
import { useEffect, useState } from "react"

import likeImg from '../../../public/images/like.svg'
import likedImg from '../../../public/images/liked.svg'
import commentImg from '../../../public/images/grayComment.svg'
import activeCommentImg from '../../../public/images/activeComment.svg'
import WriteComment from "./writeComment"

const descriptionLimit = 100

const Post = ({
    user,
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

    return (
        <div className="post">
            <Link href={`/perfil/${user.id}`}>
                <section className="postHeader">
                    <Avatar src={user.avatar} />
                    <strong>{user.name}</strong>
                </section>
            </Link>
            <div className="postImage">
                <img src={image} alt={`foto do post`}/>
            </div>

            <div className="postFooter">
                <div className="actionsPostFooter">
                    <Image
                        src={likeImg}
                        alt="icone curtir"
                        width={20}
                        height={20}
                        onClick={() => console.log('curtir')}
                    />
                    <Image
                        src={commentImg}
                        alt="icone comentar"
                        width={18}
                        height={18}
                        onClick={() => setShowCommentContainer(!showCommentContainer)}
                    />

                    <span className="quantityLikes">
                        Curtido por <strong>{likes.length}</strong> pessoas.
                    </span>
                </div>

                <div className="descriptionPostFooter">
                    <strong className="userName">{user.name}</strong>
                    <p className="description">
                        {descriptionView}
                        {!shortDescription && <span className="showMore" onClick={() => showDescription()}>{moreOrLessMsg}</span>}
                    </p>
                </div>

                <div className="commentsPostFooter">
                    {comments.map((comment: any, index: number) => (
                        <div className="comment" key={index}>
                            <strong className="userName">{comment.name}</strong>
                            <p className="description">
                                {comment.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {showCommentContainer && <WriteComment loggedUser={loggedUser}/>}
        </div>
    )
}

export default Post
