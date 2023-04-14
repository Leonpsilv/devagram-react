import Image from 'next/image'
import userImg from '../../../public/images/grayUser.svg'
import homeImg from '../../../public/images/grayHome.svg'
import postImg from '../../../public/images/grayPost.svg'
import activeUserImg from '../../../public/images/activeUser.svg'
import activeHomeImg from '../../../public/images/activeHome.svg'
import activePostImg from '../../../public/images/activePost.svg'

const Navigation = ({
    className
}: {
    className?: string
}) => {

    return (
        <nav className={`navBar ${className}`}>
            <ul>
                <li>
                    <Image
                        src={activeHomeImg}
                        alt='logo Home'
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={activePostImg}
                        alt='logo Postagens'
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={activeUserImg}
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