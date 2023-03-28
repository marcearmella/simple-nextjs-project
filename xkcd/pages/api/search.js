// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import algoliasearch from "algoliasearch/lite";

const client = algoliasearch('A222DK0A4C', '63291d72f8c858280fbde6d37801f7a6');
const index = client.initIndex('prod_comics');

export default async function handler(req, res){
  const {query: { q }} = req;

  const { hits } = await index.search(q, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  });

  res.status(200).json(hits);
}