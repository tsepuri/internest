// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let responseInfo = getAuth(req)
  console.log(responseInfo)
  res.status(200).json({ name: 'John Doe' })
}
