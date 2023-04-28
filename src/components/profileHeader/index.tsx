import AlternativeHeader from '../alternativeHeader'
import leftArrowImg from '../../../public/images/leftArrow.svg'
import Avatar from '../avatar'
import Button from '../button'
import { useEffect, useState } from 'react'
import UserService from '@/services/UserService'

const userService = new UserService()

const profileHeader = ({
    loggedUser,
    profileUser
}: {
    loggedUser?:  object,
    profileUser?: any
}) => {
    const [followingUser, setFollowingUser] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [followersQuantity, setFollowersQuantity] = useState(0)
    useEffect(() => {
        if(!profileUser) return
        setFollowingUser(profileUser.followingUser)
        setFollowersQuantity(Number(profileUser.followers))
    }, [profileUser])

    function getFollowBtn () {
        return followingUser ? 'Deixar de seguir' : 'Seguir'
    }

    function getFollowBtnClassName () {
        return followingUser ? 'inverted' : 'primary'
    }

    async function followOrUnfollowBtn () {
        try {
            setDisabledBtn(true)
            await userService.followOrUnfollow(profileUser._id)
            setFollowersQuantity(followingUser
                ? (followersQuantity - 1)
                : (followersQuantity + 1))
            setFollowingUser(!followingUser)
            setDisabledBtn(false)
        } catch (error) {
            setDisabledBtn(false)
            alert('Falha ao realizar ação!')
        }
    }

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
                            <strong>{followersQuantity}</strong>
                            <span>seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>{profileUser.following}</strong>
                            <span>seguindo</span>
                        </div>
                    </div>
                    <Button text={getFollowBtn()} color={getFollowBtnClassName()} onClick={followOrUnfollowBtn} disabled={disabledBtn}/>
                </div>
            </div>
        </div>
    )
}

export default profileHeader