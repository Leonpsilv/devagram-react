import Avatar from "../avatar"

const WriteComment = ({loggedUser}: {loggedUser?: any}) => {
    return (
        <div className="writeComment">
            <Avatar
                src={loggedUser?.src}
            />
            <textarea
                rows={1}
                placeholder="Adicione seu comentário..."
            >
            </textarea>
        </div>
    )
}

export default WriteComment