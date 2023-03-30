import avatarImg from '../../../public/images/avatar.svg'

const Avatar = ({
    src
} :
{
    src: string| undefined
}) => {
    const getAvatar = () => {
        if(src && src !== undefined) {
            return src
        }
        return avatarImg.src
    }

    return (
        <img 
            src={getAvatar()}
            alt='avatar'
            className='avatar'
        />
    )
}

export default Avatar