import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AlternativeHeader from '../alternativeHeader'
import Avatar from '../avatar'
import Button from '../button'
import UserService from '@/services/UserService'

import leftArrowImg from '../../../public/images/leftArrow.svg'
import logoutImg from '../../../public/images/logout.svg'
import Image from 'next/image'

const userService = new UserService()

const ProfileHeader = ({
    loggedUser,
    profileUser
}: {
    loggedUser?:  any,
    profileUser?: any
}) => {
    const [followingUser, setFollowingUser] = useState(false)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [itsPersonalProfile, setItsPersonalProfile] = useState(false)
    const [followersQuantity, setFollowersQuantity] = useState(0)

    const router = useRouter()

    useEffect(() => {
        if(!profileUser) return
        if(profileUser._id === loggedUser?.id) {
            setItsPersonalProfile(true)
        }
        setFollowingUser(profileUser.followingUser)
        setFollowersQuantity(profileUser.followers)
    }, [profileUser])

    function getFollowBtn () {
        if(itsPersonalProfile) return 'Editar Perfil'

        return followingUser ? 'Deixar de seguir' : 'Seguir'
    }

    function getFollowBtnClassName () {
        return followingUser || itsPersonalProfile ? 'inverted' : 'primary'
    }

    async function followOrUnfollowBtn () {
        if(itsPersonalProfile) return router.push('/perfil/editar')
        
        try {
            setDisabledBtn(true)
            await userService.followOrUnfollow(profileUser?._id)
            setFollowersQuantity(followingUser
                ? (followersQuantity - 1)
                : (followersQuantity + 1))
                setDisabledBtn(false)
                setFollowingUser(!followingUser)
        } catch (error) {
            setDisabledBtn(false)
            alert('Falha ao realizar ação!')
        }
    }

    function backToPreviousPageBtn () {
        router.back()
    }

    function getRightIcon () {
        if(!itsPersonalProfile) return null
        return (
            <Image
                src={logoutImg}
                alt='icone logout'
                onClick={logoutBtn}
                width={23}
                height={23}
            />
        )
    }

    function logoutBtn () {
        userService.logout()
        router.push('/')
    }

    return (
        <div className='profileHeader desktopLarge'>
            <AlternativeHeader
                leftIcon={itsPersonalProfile ? null : leftArrowImg}
                leftOnClick={backToPreviousPageBtn}
                tittle={profileUser?.name}
                rightIcon={getRightIcon()}
            />
            <hr className='dividingBorder'/>

            <div className='profileStatus'>
                <Avatar src={profileUser?.avatar} />
                <div className='profileInfos'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{profileUser?.posts}</strong>
                            <span>publicações</span>
                        </div>

                        <div className='status'>
                            <strong>{followersQuantity}</strong>
                            <span>seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>{profileUser?.following}</strong>
                            <span>seguindo</span>
                        </div>
                    </div>
                    <Button 
                        text={getFollowBtn()}
                        color={getFollowBtnClassName()}
                        onClick={followOrUnfollowBtn}
                        disabled={disabledBtn}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader