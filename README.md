# Backend Projet IA M1MIAGE 2023-2024

## Description

C'est une api REST qui permet d'utiliser l'API d'openAI pour un projet donné dans le cadre du Master MIAGE.

## Objectifs
* Générer des images en fonction de demandes
* Générer des réponses textuelles en fonction d'une demande


## Installation

Pour utiliser ce projet, vous aurez besoin de :

1. **Clonez ou téléchargez les projets à partir de GitHub.**
   ```
   git clone https://github.com/dioprawane/backend_projet_ia_M1MIAGE_2023_2024.git
   ```

2. **Installez les dépendances Node.js** en exécutant la commande suivante à la racine du projet **backend_projet_ia_M1MIAGE_2023_2024** puis dans le dossier **server** du projet
   ```
   npm install
   ```


3. **Démarrez le serveur Node.js** en exécutant la commande suivante dans le dossier `serveur` du projet `backend_projet_ia_M1MIAGE_2023_2024`:

   ```
   cd serveur
   node server.js
   ```

-------------------------------------------------------------------------------------------

## Description des routes 

* \image : c'est une requête post qui permet de générer une image à partir d'un prompt.
* \chat :  c'est une requête post qui permet de générer une réponse textuelle à partir d'un prompt.
* \speech : c'est une requête post qui permet de générer en plus de la réponse textuelle, une réponse vocale.
* \stable-diffusion : nous n'avons pas eu le temps de le faire car nous étions plutôt focalisés sur le modèle fine-tuning.

## Contributeurs

- M. DIOP Serigne Rawane
- M. BORREANI Théo

## Contacts

Si vous avez besoin d'aide ou si vous avez des questions, veuillez nous contacter à notre adresse électronique :

- serigne-rawane.diop@etu.unice.fr
- borreani.theo@etu.unice.fr
