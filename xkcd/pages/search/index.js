import { Layout } from 'components/Layout';
import { search } from 'services/search.js';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Search({query, results}){
    return <>
        <Head>
            <title>xkcd - Results for {query}</title>
            <meta name="description" content={`Search results for ${query}`} />
        </Head>

        <Layout>
            <h1>{results.length} Resultados para {query}</h1>
            {
                results.map(result => {
                    return (
                        <Link href={`/comic/${result.id}`} key={result.id} className='bg-slate-300 hover:bg-slate-50 flex flex-row justify-start content-center'>
                            <Image width={50} height={50} src={result.img} alt={result.alt} className="rounded-full" />
                            <div>
                                <h2>{result.title}</h2>
                            </div>
                        </Link>
                    )
                })
            }
        </Layout>
    </>
}

export async function getServerSideProps(context){
    const { query } = context;
    const { q = '' } = query;

    const { results } = await search({ query: q });

    return{
        props: {
            query: q,
            results
        }
    }
}