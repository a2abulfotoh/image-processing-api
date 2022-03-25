import express from 'express';
import routes from './routes/index';


const app: express.Application = express();
const port = 5000; // Default port

app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/api');
});

  //route to handle the app routes
  app.use('/api', routes);
  
  app.listen(port,async (): Promise<void> => {
      console.log(`Listening on port ${port}`)
    });
  
  export default app;