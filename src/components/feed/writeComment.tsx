import { useState } from "react"
import Avatar from "../avatar"

const WriteComment = ({
    loggedUser,
    publishComment
}: {
    loggedUser?: any,
    publishComment: any
}) => {
    const [rows, setRows] = useState(1)
    const [comment, setComment] = useState('')

    function whenTypeComment (e: any) {
        const c = e.target?.value
        setComment(c)

        setRows(c.length > 10 ? 2 : 1)
    }

    async function whenTypeEnter (e: any) {
       if(e.code !== 'Enter' || comment.trim().length === 0 || !publishComment) return
       publishCommentFn()
    }
    
    async function publishCommentFn () {
        if(comment.trim().length <= 1) return
        const success = await publishComment(comment)
        if(success) {
            setComment('')
            setRows(1)         
        }
    }

    return (
        <div className="writeComment">
            <Avatar
                src={loggedUser?.src}
            />
            <textarea
                rows={rows}
                placeholder="Adicione seu comentário..."
                onChange={whenTypeComment}
                onKeyDown={whenTypeEnter}
                value={comment}
            >
            </textarea>
            <button
                type="button"
                className="btnPost desktop"
                onClick={publishCommentFn}
            >
                Publicar
            </button>
        </div>
    )
}

export default WriteComment