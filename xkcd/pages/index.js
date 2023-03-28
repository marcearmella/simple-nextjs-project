import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Card, Row, Text } from '@nextui-org/react';
import { Layout } from 'components/Layout';
import fs from 'node:fs/promises';

export default function Home({latestComics}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2 className='text-3xl font-bold text-center mb-10'>Latest Comics</h2>
        <section className='grid grid-cols-1 gap-2 max-w-md m-auto md:grid-cols-2 lg:grid-cols-3'>
          {
            latestComics.map(comic => {
              return (
                <Link className='mb-4 pb-4' href={`/comic/${comic.id}`} key={comic.id}>
                  <h3 className='font-bold text-sm text-center pb-2'>{comic.title}</h3>
                  <Image width={300} height={300} src={comic.img} alt={comic.alt} />
                </Link>
              )
            })
          }
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(context){
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async file => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  })
  
  const latestComics = await Promise.all(promisesReadFiles);
  
  return {
    props: {
      latestComics
    }
  }
}