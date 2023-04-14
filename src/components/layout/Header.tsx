import Image from 'next/image'
import horizontalLogoImg from '../../../public/images/horizontalLogo.svg'
import magnifierImg from '../../../public/images/magnifier.svg'
import Navigation from './Navigation'

const Header = () => {

    return (
        <header className='homeHeader'>
            <div className='principalContentHeader'>
                <div className='principalLogoHeader'>
                    <Image src={horizontalLogoImg} fill alt={'logo horizontal'} />
                </div>

                <div className='searchBar'>
                    <div className='magnifierContainer'>
                        <Image src={magnifierImg} fill alt={'ícone pesquisa'} />
                    </div>
                    <input
                      type='text'
                      placeholder='Pesquisar'
                      value={''}
                      onChange={() => console.log('pesquisando')}
                    />
                </div>

                <Navigation className='desktop' />

            </div>
        </header>
    )
}

export default Header