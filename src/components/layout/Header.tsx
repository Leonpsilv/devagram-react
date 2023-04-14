import Image from 'next/image'
import horizontalLogoImg from '../../../public/images/horizontalLogo.svg'
import magnifierImg from '../../../public/images/magnifier.svg'
import Navigation from './Navigation'
import { useState } from 'react'
import SearchResult from './SearchResult'

const Header = () => {
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [search, setSearch] = useState('')

    const whenSearch = (search: string) => {
        setSearch(search)
        // setSearchResult([])

        setSearchResult([
            {
                avatar: '',
                name: 'leozin',
                email: 'leozin@email.com',
                id: 123124
            },
            {
                avatar: '',
                name: 'enzin',
                email: 'enzin@email.com',
                id: 1235534
            },
            {
                avatar: '',
                name: 'musashi',
                email: 'musashi@email.com',
                id: 24654124
            },
        ])
    }

    const whenClickSearchResult = (id: string) => {
        console.log('clicou resultado pesquisa', {id})

        if(search.length < 3) return
    }

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