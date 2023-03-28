import Link from 'next/link';

export function Header(){
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
                    <li className="transition hover:opacity-80 text-sm font-semibold"><Link href='/search'>Search</Link></li>
                </ul>
            </nav>
        </header>
    )
}