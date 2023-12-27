import { createHmac } from 'crypto';

export default async function handleWebhook(req, res) {

  console.log('handle');
  res.revalidate('/');
    return res.status(200).send('Success!');

}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let bodyChunks = [];
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8');
      resolve(rawBody);
    });
    req.on('data', (chunk) => bodyChunks.push(chunk));
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
