import express from 'express';
import { logger } from './logHelper';
import processPostcode from "./processPostcode";
const app = express();
const port: number = 3000;

app.get('/departureBoards', async (req, res) => {
    logger.info(`Departure board requested`);
    const postcode = req.query['postcode'];
    if (!postcode) {
        logger.error('No postcode specified');
        res.status(400).send('No postcode specified!');
    }
    else {
        try {
            res.send(await processPostcode(String(postcode)));
        }
        catch (error) {
            logger.error(error.message);
            res.status(500).send("Error 500: " + error.message);
        }
    }
    // res.send('Hello world!');
});

app.listen(port, () => {
    logger.info(`Listening at http://localhost/:${port}`);
});