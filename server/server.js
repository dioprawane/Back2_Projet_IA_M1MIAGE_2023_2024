// generate minimal server for api with express
import fs from 'fs';
import express from 'express';
import { API_KEY } from './config.js';
import OpenAI from 'openai';
// handle form data posted
import multer from 'multer';
import cors from 'cors';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Initialisez l'application express
const app = express();

// Utilisez cors
app.use(cors());

// Créez une instance de OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: API_KEY,
});

const port = 3001;

// La configuration CORS ci-dessous est redondante car `app.use(cors());` est déjà utilisée
// Supprimez ce bloc si vous utilisez `app.use(cors());` pour gérer CORS.
/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
*/

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/') // Assurez-vous que ce dossier existe
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

// Pour utiliser la configuration de stockage définie ci-dessus, passez-la à multer comme suit :
// const upload = multer({ storage: storage });
// Si vous n'avez pas besoin de stocker les fichiers sur le disque (par exemple, si vous les traitez immédiatement), vous pouvez omettre cette partie.

// Utilisation de multer sans stockage sur disque spécifique pour le moment
const upload = multer();

// handle post request to /chat, and use multer to get the form data
app.post('/chat', upload.none(), async (req, res) => {
    const prompt = req.body.prompt;
    console.log("PROMPT: ", prompt);
    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{ "role": "user", "content": prompt }],
        temperature: 1,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    res.json(response);
});

app.post('/image', upload.none(), async (req, res) => {
  const prompt = req.body.prompt;
  console.log("IMAGE PROMPT: ", prompt);
  
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "256x256",
  });

  res.json(response);
});

/*app.post('/analyze', upload.single('file'), async (req, res) => {
  if (!req.file) {
      // Si aucun fichier n'a été téléchargé ou si le champ ne correspond pas
      return res.status(400).send('No file uploaded or incorrect field name.');
  }

  // Aucun besoin de réimporter fs et path puisqu'ils sont déjà importés
  const filePath = path.join(__dirname, req.file.path);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Analysez ce document comptable : ${fileContent}`,
      temperature: 0.7,
      max_tokens: 500,
  });

  res.json({analysis: response.data.choices[0].text});

  // Suppression sécurisée du fichier après utilisation
  try {
      fs.unlinkSync(filePath);
  } catch (err) {
      console.error(err);
  }
});*/

// Modifier la route /analyze pour accepter un prompt textuel au lieu d'un fichier
app.post('/analyze', upload.none(), async (req, res) => {
  const prompt = req.body.prompt;
  console.log("PROMPT: ", prompt);
  if (!prompt) {
    return res.status(400).send('No prompt provided.');
  }

  /*const response = await openai.completions.create({
    model: "gpt-3.5-turbo-0125",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 500,
});


  res.json({ analysis: response.data.choices[0].text });*/
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [{ "role": "user", "content": prompt }],
    temperature: 1,
    max_tokens: 700,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});

res.json(response);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
