import { resolve } from 'path';
import express from 'express';
import 'dotenv/config';

// functions
import { getGames } from './utils/functions.js';

const app = express();

// Middlewares
app.set('views', resolve('./src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve('./src/public')));
app.use(express.json());

app.get('/', async (_, res) => res.render('home', { jeux : await getGames() }));

app.get("/jeux", async (req, res) => res.json(await getGames(req.url.split("/jeux")[1])));

app.get('*', (_, res) => res.status(404).render('errors/404'));

app.listen(process.env.PORT, () => console.log(`[Portail Jeux] Listen on port ${process.env.PORT}`));