import express from 'express';
import '@babel/polyfill';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();


// Basic home route
app.get('/', (req, res) => {
    return res.status(200).json({ data: 'Welcome to papa_api' })
});

// Handle unavailable routes 
app.use((req, res, next) => {
    const error = new Error('This route is not listed in the endpoints, Route not found');
    error.status = 400;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: `This error is thrownw because ${error.name}, ${error.message}` });
});


const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`server is listening on port ${port}`) });

export default app;
