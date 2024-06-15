
const endpointAnalyze = 'http://localhost:3001/analyze';

import { toggleLoader } from './script.js';

import { updateUIWithAnalysis } from './script.js';

/*export async function sendFileForAnalysis(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(endpointAnalyze, {
            method: 'POST',
            body: formData, // Le Content-Type est automatiquement défini sur multipart/form-data
        });

        const data = await response.json();
        console.log('Analyse:', data.analysis); // Affichez l'analyse ici ou mettez à jour l'UI en conséquence

        // Mettre à jour l'UI avec le résultat de l'analyse
        updateUIWithAnalysis(data.analysis);
        return data;
    } catch (error) {
        console.error('Error sending file for analysis:', error);
    } finally {
        toggleLoader(false); // Assurez-vous de cacher le loader une fois l'opération terminée
    }
}*/

/*export async function sendTextForAnalysis(textContent) {
    const formData = new FormData();
    formData.append('prompt', textContent); // Envoyer le contenu comme prompt
  
    try {
      const response = await fetch(endpointAnalyze, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log('Analyse:', data.analysis);
      updateUIWithAnalysis(data.analysis);
    } catch (error) {
      console.error('Error sending text for analysis:', error);
    } finally {
      toggleLoader(false);
    }
  }*/
  // analyze.js
/*export async function sendTextForAnalysis(textContent, outputElement) {
    try {
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify({ prompt: textContent });

        const response = await fetch(endpointAnalyze, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        const data = await response.json();

        if(data && data.analysis !== undefined) {
            console.log('Analyse:', data.analysis);
            updateUIWithAnalysis(data.analysis, outputElement);
        } else {
            console.error('La réponse du serveur ne contient pas "analysis".', data);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du texte pour analyse:', error);
    } finally {
        toggleLoader(false);
    }
}*/
// Dans analyze.js
export async function sendTextForAnalysis(textContent, outputElement) {
    const formData = new FormData();
    formData.append('prompt', textContent);

    try {
        const response = await fetch(endpointAnalyze, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
        // Vérifier si 'choices' est bien présent et non vide.
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const analysisContent = data.choices[0].message.content;
            console.log('Analyse:', analysisContent);
            
            // Appeler updateUIWithAnalysis avec le contenu analysé
            updateUIWithAnalysis(analysisContent, outputElement);
        } else {
            console.error('Aucune analyse reçue du serveur ou format de réponse non attendu.', data);
            // Vous pourriez afficher un message d'erreur dans l'UI ici
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du texte pour analyse:', error);
    } finally {
        toggleLoader(false); // Cacher le loader après avoir fini
    }
}
