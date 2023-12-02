
// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello, Next.js API!' });
};
