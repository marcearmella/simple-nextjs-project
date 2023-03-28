import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link';
import {readFile, stat, readdir} from 'fs/promises';
import { basename } from "path";
import { Layout } from "components/Layout";

export default function Comic({id, img, alt, title, width, height, prevId, nextId, hasNext, hasPrevious}){
    return <>
        <Head>
            <title>Comic #{id}</title>
            <meta name="description" content="Comics for developers" />
        </Head>

        <Layout>
            <section className="max-w-lg m-auto">
                <h1 className="font-bold text-center m-5">{title}</h1>
                <Image className="m-auto" width={width} height={height} src={img} alt={'Image for ' + title} />
                <p className="mt-5 mb-5">{alt}</p>
                <div className="flex justify-between font-bold">
                    {
                        hasPrevious && <Link className="text-gray-600 mr-5" href={`/comic/${prevId}`}>Previous</Link>
                    }
                    {
                        hasNext && <Link className="text-gray-600" href={`/comic/${nextId}`}>Next</Link>
                    }
                </div>
            </section>
        </Layout>
    </>
}

export async function getStaticPaths(){
    const files = await readdir('./comics');

    const paths = files.map(file => {
        const id = basename(file, '.json');
        return {
            params: {id}
        }
    })
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({params}){
    const {id} = params;
    const content = await readFile(`./comics/${id}.json`, 'utf8');
    const comic = JSON.parse(content);

    const idNumber = +id;
    const prevId = idNumber -1;
    const nextId = idNumber + 1;

    const [prevResult, nextResult] = await Promise.allSettled([
        stat(`./comics/${prevId}.json`),
        stat(`./comics/${nextId}.json`)

    ]);

    const hasPrevious = prevResult.status == 'fulfilled';
    const hasNext = nextResult.status == 'fulfilled';

    return {
        props: {
           ...comic,
           hasPrevious,
           hasNext,
           nextId,
           prevId
        }
    }
}