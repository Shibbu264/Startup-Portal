import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Add your custom API routes and CORS configurations here
  server.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Replace this with your backend API URL
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*', // Replace '*' with your actual frontend origin
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
