import express from 'express';
import processPostcode from "./processPostcode";
const app = express();
const port: number = 3000;

app.get('/', async (req, res) => {
    const postcode = req.query['postcode'];
    if (!postcode) {
        res.send('No postcode specified!');
    }
    else {
        try {
            res.send(await processPostcode(String(postcode)));
        }
        catch (error) {
            res.send(error.message);
        }
    }
    // res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});