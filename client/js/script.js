import { sendTextForAnalysis } from './analyze.js';

// Ensure this is inside the module where you can use it
document.addEventListener('DOMContentLoaded', (event) => {
    const fileInput = document.getElementById('file-input');
    const submitButton = document.getElementById('submit');
    const outputElement = document.getElementById('output');
    let selectedFile;

    fileInput.addEventListener('change', (event) => {
        selectedFile = event.target.files[0];
        if (!selectedFile) {
            console.log('No file selected.');
            return;
        }
        toggleFile(true); 

        // Display the file name on the page instead of reading it right away
        const fileNameDisplay = document.getElementById('file-name-display');
        fileNameDisplay.textContent = selectedFile.name; // "nom_du_fichier.extension"
    });

    /*submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        if (!selectedFile) {
            console.log('No file selected to read.');
            return;
        }

        // Affiche le loader
        toggleLoader(true);

        // Envoie le fichier pour analyse
        sendFileForAnalysis(selectedFile); // Assurez-vous que cette fonction est accessible depuis script.js

        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;

            // Log content to the console
            console.log(content);
            toggleFile(false); 

            // Here you can handle the content further if needed
        };

        // Choose how to read the file based on its type
        if (selectedFile.type.includes("text/") || selectedFile.type === "application/json") {
            reader.readAsText(selectedFile);
        } else if (selectedFile.type === "application/pdf") {
            // Handle PDF differently
            reader.readAsArrayBuffer(selectedFile);
        } else {
            // Read other file types as text by default
            reader.readAsText(selectedFile);
        }
    });*/
    // Ajoutez un écouteur d'événements pour le bouton de soumission
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
    
        if (!selectedFile) {
        console.log('No file selected to read.');
        return;
        }
    
        const reader = new FileReader();
    
        reader.onload = async function(e) {
        const content = e.target.result;
        console.log(content);
        await sendTextForAnalysis(content, outputElement);
    
        // Envoyez le contenu du fichier pour analyse
        //await sendTextForAnalysis(content);
        };
    
        // Choisissez comment lire le fichier basé sur son type
        if (selectedFile.type.includes("text/") || selectedFile.type === "application/json") {
        reader.readAsText(selectedFile);
        } else {
        console.log("Unsupported file type");
        }
    });
});


document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
    const input = document.getElementById('chat-input');
    console.log('Input:', input.value);
    console.log('hidden:', this.hidden);
    if (input.value.trim() !== '') {
        console.log('Afficher le loader');
        toggleLoader(true); // Affiche le loader
        
        // Simuler l'envoi d'une requête au serveur
        setTimeout(() => {
            console.log('Cacher le loader');
            toggleLoader(false);
            input.value = ''; // Réinitialisation de l'input après envoi
        }, 1000); // Simule un délai de réponse du serveur de 2 secondes
    }
});

// Fonction pour basculer l'état visible du loader
export function toggleLoader(show) {
    document.querySelector('.loader').style.display = show ? 'block' : 'none';
    console.log('Loader état:', !show ? 'Caché' : 'Affiché');
}

// Fonction pour basculer l'état visible du loader
export function toggleFile(show) {
    document.querySelector('.file_load').style.display = show ? 'block' : 'none';
    console.log('File état:', !show ? 'Caché' : 'Affiché');
}

export function updateUIWithAnalysis(analysis, outputElement) {
    // Ici, vous pouvez par exemple créer un nouvel élément dans votre page web qui affiche l'analyse
    const analysisElement = document.createElement('p');
    analysisElement.textContent = analysis;
    outputElement.appendChild(analysisElement);
}

