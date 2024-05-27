import { getImageFromDallE } from './dallE.js';

// Import the `toggleLoader` function if you move it to a module
import { toggleLoader } from './script.js';

import { sendTextForAnalysis } from './analyze.js';


const endpointURL = 'http://localhost:3001/chat';

let outputElement, submitButton, inputElement, historyElement, butonElement;

window.onload = init;

function init() {
    outputElement = document.querySelector('#output');
    submitButton = document.querySelector('#submit');
    submitButton.onclick = getMessage;

    inputElement = document.querySelector('#chat-input');
    butonElement = document.querySelector('#chat-form');
    historyElement = document.querySelector('.history');
    //butonElement.onclick = clearInput;
}

function clearInput() {
    inputElement.value = '';
}

async function getMessage() {
    let prompt = inputElement.value;
    // on met le prompt en minuscules
    prompt = prompt.toLowerCase();
    if (prompt === '') return;

    //loader.style.display="block"; // Afficher le loader ici
    toggleLoader(true); 

    if (prompt.startsWith('/image ')) {

        // TODO ne le faire que si le prompt commence par "/image", sinon appeler
        // le web service qui répond avec GPT-3.5 comme dans la question 2

        // On envoie une requête de génération d'image au serveur
        let fichier = await getImageFromDallE(prompt);
        console.log(fichier);

        fichier.data.forEach(imageObj => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const imgElement = document.createElement('img');
            imgElement.src = imageObj.url;
            imgElement.width = 256;
            imgElement.height = 256;

            imageContainer.append(imgElement);

            outputElement.append(imageContainer);
        });

        // Ajout de l'input à l'historique
        addToHistory(inputElement.value);

        // on vide l'input
        //inputElement.value = '';
        // Vider l'input
        clearInput();
    } else if (prompt.startsWith('/song ')) {
        console.log("Je demande une chanson avec comme sujet", prompt.substring(6));
        // Ajout de l'input à l'historique
        addToHistory(inputElement.value);
        // on vide l'input
        // Vider l'input
        clearInput();
        toggleLoader(false);
        // Simulez le traitement ici, puis cachez le loader
    } else if (prompt.startsWith('/analyze ')) {
        const textToAnalyze = prompt.slice('/analyze '.length);
    
        if(textToAnalyze.trim() === '') {
            console.log("Aucun texte fourni pour l'analyse.");
            return;
        }
    
        // Assurez-vous de passer outputElement à sendTextForAnalysis
        sendTextForAnalysis(textToAnalyze, outputElement);
    }  else {
        // Appel à GPT-3 pour les autres cas
        await getResponseFromServer(prompt); // Assurez-vous que cette fonction gère correctement le loader
    }
}

async function getResponseFromServer(prompt) {
    try {
        // On envoie le contenu du prompt dans un FormData (eq. formulaires multipart)
        const promptData = new FormData();
        promptData.append('prompt', prompt);

        // Envoi de la requête POST par fetch, avec le FormData dans la propriété body
        // côté serveur on récupèrera dans req.body.prompt la valeur du prompt,
        // avec nodeJS on utilisera le module multer pour récupérer les donénes 
        // multer gère les données multipart/form-data
        const response = await fetch(endpointURL, {
            method: 'POST',
            body: promptData
        });

        const data = await response.json();

        console.log(data);
        const chatGptReponseTxt = data.choices[0].message.content;
        // On cree un element p pour la réponse
        const pElementChat = document.createElement('p');
        pElementChat.textContent = chatGptReponseTxt;
        // On ajoute la réponse dans le div output
        outputElement.append(pElementChat);

        // Ajout dans l'historique sur la gauche
        if (data.choices[0].message.content) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.onclick = () => {
                inputElement.value = pElement.textContent;
            };
            historyElement.append(pElement);
            //addToHistory(inputElement.value);
        }
        // Effacer le contenu de l'input
        clearInput();
        //butonElement.onclick = clearInput;
    } catch (error) {
        console.log(error);
    } finally {
        toggleLoader(false);
     }
}


function addToHistory(text) {
    if (text === '') return;
  
    const pElement = document.createElement('p');
    pElement.textContent = text;
    pElement.onclick = () => {
      inputElement.value = pElement.textContent;
    };
    historyElement.append(pElement);
  }