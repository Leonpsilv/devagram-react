import Image from 'next/image'
import userImg from '../../../public/images/grayUser.svg'
import homeImg from '../../../public/images/grayHome.svg'
import postImg from '../../../public/images/grayPost.svg'
import activeUserImg from '../../../public/images/activeUser.svg'
import activeHomeImg from '../../../public/images/activeHome.svg'
import activePostImg from '../../../public/images/activePost.svg'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const routeMaps = {
    home: {
        activeImg: activeHomeImg,
        activeRoutes: ['/'],
        defaultImg: homeImg
    },
    post: {
        activeImg: activePostImg,
        activeRoutes: ['/publicacao'],
        defaultImg: postImg
    },
    profile: {
        activeImg: activeUserImg,
        activeRoutes: ['/perfil/eu', '/perfil/eu/editar'],
        defaultImg: userImg
    }
}

const Navigation = ({
    className
}: {
    className?: string
}) => {
    const [currentRoute, setCurrentRoute] = useState('home')
    const router = useRouter()

    useEffect(() => {
        setActiveRoute()
    }, [router.asPath])

    function setActiveRoute () {
        const keysOfRouteMaps = Object.keys(routeMaps)

        const activeIndex = keysOfRouteMaps.findIndex((key: string) => {
            return (routeMaps as any)[key as keyof object].activeRoutes.includes(
                window.location.pathname
            )
        })

        if (activeIndex === -1) {
            setCurrentRoute('home');
        } else {
            setCurrentRoute(keysOfRouteMaps[activeIndex]);
        }
    }

    const getImage = (routeName: string) => {
        const activeCurrentRoute = routeMaps[routeName as keyof object];

        if (currentRoute === routeName) {
            return activeCurrentRoute['activeImg'];
        }

        return activeCurrentRoute['defaultImg'];
    }

    const whenClickIcon = (routeName: string) => {
        setCurrentRoute(routeName)
        router.push((routeMaps as any)[routeName as keyof object].activeRoutes[0])
    }

    return (
        <nav className={`navBar ${className}`}>
            <ul>
                <li onClick={() => whenClickIcon('home')}>
                    <Image
                        src={getImage('home')}
                        alt='logo Home'
                        width={20}
                        height={20}
                    />
                </li>
                <li onClick={() => whenClickIcon('post')}>
                    <Image
                        src={getImage('post')}
                        alt='logo Postagens'
                        width={20}
                        height={20}
                    />
                </li>
                <li onClick={() => whenClickIcon('profile')}>
                    <Image
                        src={getImage('profile')}
                        alt='logo Usuário'
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    )
}

export default Navigation