// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {search} from 'services/search.js';

export default async function handler(req, res){
  const {query: { q }} = req;

  const { results } = await search({ query: q });

  return res.status(200).json(results);
}