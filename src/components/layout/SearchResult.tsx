import Avatar from "../avatar"

const SearchResult = ({
    name,
    email,
    avatar,
    id,
    onClick
}:{
    name: string,
    email: string,
    avatar?: string,
    id: string,
    onClick: any
}) => {
    return (
        <div className="searchResult">
            <Avatar src={avatar}/>
            <div className="userInfos" onClick={onClick(id)}>
                <strong>{name}</strong>
                <span>{email}</span>
            </div>
        </div>
    )
}

export default SearchResult