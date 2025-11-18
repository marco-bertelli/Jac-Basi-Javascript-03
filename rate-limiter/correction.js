import express from 'express';

const app = express();
let coda = [];

// ! sample get endpoint
app.get('/', rateLimiterMiddleware, richiestaSucc);

async function richiestaSucc(req, res) {
    await sleep(5000);

    res.json({ message: 'This is some data.' });

    // ! rimuovo la richiesta (cliente) dalla coda
    coda.splice(0, 1);

    console.log("Finish serving client")

    // ! controllo se c'è qualcun altro (aaray non vuoto) se vuoto fine, 
    // ! se non vvuoto allora richiamo la funzione con req e res salvate

    if (coda.length === 0) {
        return;
    }

    if (coda.length != 0) {
        let richiestaSuccessiva = coda[0];
        richiestaSucc(richiestaSuccessiva.req, richiestaSuccessiva.res)
    }
}

function rateLimiterMiddleware(req, res, next) {
    // ! logica della coda (inserisco e se sono il primo chiamo next)
    if (coda.length === 0) {
        coda.push({ req, res })

        next();

        return;
    }

    // ! se non sono il primo lo inserisco nell'array ma non chiamo il next
    coda.push({ req, res })
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});