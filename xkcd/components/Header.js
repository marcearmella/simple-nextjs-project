import Link from 'next/link';
import { useRef, useState } from 'react';

export function Header(){
    const [results, setResults] = useState([]);
    const searchRef = useRef();

    const q = searchRef.current?.value;

    const handleChange = () => {
        const q = searchRef.current.value
        fetch(`api/search?q=${q}`)
        .then(res => res.json())
        .then(searchResults => {
            setResults(searchResults);
        })
    }

    return (
        <header className='flex justify-between items-center p-4 max-w-xl m-auto'>
            <div>
                <Link className="transition hover:opacity-80" href='/'>
                    <h1 className='font-bold'>Next <span className='font-light'>xkcd</span></h1>
                </Link>
            </div>
            <nav>
                <ul className="flex flex-row gap-2">
                    <li className="transition hover:opacity-80 text-sm font-semibold"><Link href='/'>Home</Link></li>
                    {/* <li className="transition hover:opacity-80 text-sm font-semibold"><Link href='/search'>Search</Link></li> */}
                    <li>
                        <input className='px-4 py-1 border border-gray-400 rounded-3xl text-xs' type='search' ref={searchRef} onChange={handleChange} />
                        <div className='relative'>
                            {
                                Boolean(results.length) && <div className='absolute top-1 left-0'>
                                    <ul className='overflow-hidden w-full border rounded-lg shadow-xl bg-white border-gray-400'>
                                        <li className='m-0' key='all-results'>
                                            <Link href={`/search?q=${q}`} className='block px-2 py-1 overflow-hidden text-sm italic font-semibold text-gray-400 hover:bg-slate-200 text-ellipsis whitespace-nowrap'>
                                                Ver {results.length} resultados
                                            </Link>
                                        </li>
                                        {results.map(result => {
                                            return (
                                                <li className='m-0' key={result.id}>
                                                    <Link href={`/comic/${result.id}`} className='px-2 py-1 text-sm font-semibold hover:bg-slate-200 block overflow-hidden text-ellipsis whitespace-nowrap'>
                                                        {result.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}