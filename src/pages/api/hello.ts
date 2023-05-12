// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { HfInference } from "@huggingface/inference";

type Data = {
  response: string
}

const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const a = await inference.textGeneration({
    model: 'bigcode/starcoder',
    inputs: 'const foo = () => {',
    parameters: {
      
    }
  });

  // const t = await inference.translation({
  //   model: 't5-base',
  //   inputs: 'My name is Wolfgang and I live in Berlin'
  // })
  // console.log(t.translation_text);

  res.status(200).json({ response: a.generated_text })
  
}
