import Image from 'next/image'
import horizontalLogoImg from '../../../public/images/horizontalLogo.svg'
import magnifierImg from '../../../public/images/magnifier.svg'
import Navigation from './Navigation'
import { useState } from 'react'
import SearchResult from './SearchResult'
import UserService from '@/services/UserService'
import { useRouter } from 'next/router'

const userService = new UserService()

const Header = ({loggedUser} : {loggedUser? : any}) => {
    const [searchResult, setSearchResult] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const router = useRouter()

    let classNameHeader = ''
    if(window && window.location.pathname !== '/'){
        classNameHeader = 'desktop'
    }

    const whenSearch = async (search: string) => {
        try {
            setSearch(search)
            setSearchResult([])
            if(search && search.length > 2){
                const {data} = await userService.search(search)
                setSearchResult(data)
                return
            }
            return
        } catch (error: any) {
            alert('erro ao pesquisar usuário. ' + error?.response?.data?.error)
        }
    }

    const whenClickSearchResult = (id: string) => {
        setSearch('')
        setSearchResult([])
        router.push(`/perfil/${id === loggedUser?.id ? 'eu': id}`)
    }

    const homeRedirect = () => {
        router.push('/')
    }

    return (
        <header className={`homeHeader ${classNameHeader}`}>
            <div className='principalContentHeader'>
                <div className='principalLogoHeader'>
                    <Image
                        onClick={() => homeRedirect()}
                        src={horizontalLogoImg}
                        fill
                        priority
                        alt={'logo horizontal'}
                    />
                </div>

                <div className='searchBar'>
                    <div className='magnifierContainer'>
                        <Image src={magnifierImg} fill alt={'ícone pesquisa'} />
                    </div>
                    <input
                      type='text'
                      placeholder='Pesquisar'
                      value={search}
                      onChange={(e: any) => whenSearch(e.target.value)}
                    />
                </div>

                <Navigation className='desktop' />
            </div>
                {searchResult.length > 0 && (
                <div className='searchResultContainer'>
                    {searchResult.map((r: any) => (
                        <SearchResult 
                            name={r.name}
                            email={r.email}
                            avatar={r?.avatar}
                            key={r._id}
                            id={r._id}
                            onClick={whenClickSearchResult}
                        />
                    ))}
                </div>
                )}

        </header>
    )
}

export default Header