import AlternativeHeader from '../alternativeHeader'
import leftArrowImg from '../../../public/images/leftArrow.svg'
import Avatar from '../avatar'
import Button from '../button'

const profileHeader = ({
    loggedUser,
    profileUser
}: {
    loggedUser?:  object,
    profileUser?: any
}) => {
    return (
        <div className='profileHeader desktopLarge'>
            <AlternativeHeader leftIcon={leftArrowImg} tittle={profileUser.name}/>
            <hr className='profileHeaderBorder'/>

            <div className='profileStatus'>
                <Avatar src={profileUser.avatar} />
                <div className='profileInfos'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{profileUser.posts}</strong>
                            <span>publicações</span>
                        </div>

                        <div className='status'>
                            <strong>{profileUser.followers}</strong>
                            <span>seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>{profileUser.following}</strong>
                            <span>seguindo</span>
                        </div>
                    </div>
                    <Button text='seguir' color='primary'/>
                </div>
            </div>
        </div>
    )
}

export default profileHeader