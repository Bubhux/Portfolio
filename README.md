![Static Badge](/public/static/badges/JavaScript.svg)   

![Static Badge](/public/static/badges/React.svg)   
![Static Badge](/public/static/badges/Vite.svg)   
![Static Badge](/public/static/badges/Tailwind.svg)   

![Static Badge](/public/static/badges/Remix.svg)   
![Static Badge](/public/static/badges/Three.svg)   

![Static Badge](/public/static/badges/Node.svg)   
![Static Badge](/public/static/badges/Npm.svg)   

<div id="top"></div>

## Menu   

1. **[Informations générales](#informations-générales)**   
2. **[Interface de l'application](#interface-application)**   
3. **[Accès à la démonstration en ligne](#lien-application)**   
4. **[Configuration du formulaire Contact](#formulaire-application)**    
5. **[Liste pré-requis](#liste-pre-requis)**   
6. **[Lancement de l'application](#lancement-application)**   
7. **[Correction *renderToReadableStream*](#correction-application)**   
8. **[Auteur, contact et remerciements](#auteur-contact)**   

<div id="informations-générales"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Projet Design Portfolio   

- Développement d'un Portfolio Design avec **React**.    

- Utilisation de **React**, **Vite.js** et **Remix**.   
- Utilisation de **Three.js** et de **Tailwind CSS**.   

--------------------------------------------------------------------------------------------------------------------------------

<div id="interface-application"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Interface de l'application   

- L'application est exécutée dans une page web.   
  
<div style="display: flex; justify-content: flex-start; margin: 20px 0;">
    <div style="border: 1px solid #8d8d8d; border-radius: 5px; padding: 10px; padding-bottom: 2px; display: inline-block; margin-right: 10px; margin-left: 20px;">
        <img src="/public/static/img/screen-portfolio.png" alt="Screen portfolio" style="width: 1200px; height: auto;">
    </div>
</div>

--------------------------------------------------------------------------------------------------------------------------------

<div id="lien-application"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Accès à la démonstration en ligne   

- Vous pouvez accéder à une démonstration du portfolio via **Cloudflare Pages**.   
- En utilisant le lien suivant ➔ [Lien du portfolio en ligne](https://2eeb9101.portfolio-8ym.pages.dev/)   

--------------------------------------------------------------------------------------------------------------------------------

<div id="formulaire-application"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Configuration du formulaire Contact   

<div style="display: flex; justify-content: flex-start; margin: 20px 0;">
    <div style="border: 1px solid #8d8d8d; border-radius: 5px; padding: 10px; padding-bottom: 2px; display: inline-block; margin-right: 10px; margin-left: 20px;">
        <img src="/public/static/img/screen-formulaire.png" alt="Screen formulaire" style="width: 1200px; height: auto;">
    </div>
</div>

- Pour faire fonctionner le formulaire de contact, créez un compte **EmailJS** ➔ [Création d'un compte EmailJS](https://www.emailjs.com/) et le configurer.
  Il faudra ensuite créer un fichier ``.env`` à la racine du projet.   

- Exemple fichier ``.env`` :

```bash   
VITE_APP_EMAILJS_PUBLIC_KEY=VB6AFLYgeG81Kftru  # Clé publique
VITE_APP_EMAILJS_SERVICE_ID=service_u2f80ks    # Identifiant de service
VITE_APP_EMAILJS_TEMPLATEID=template_g18y085   # Identifiant de modèle
```   

- Si vous souhaitez utiliser **Cloudflare** pour le déploiement il faudra créer un fichier ``.dev.vars`` à la racine du projet.   

- Exemple fichier ``.dev.vars`` :

```bash   
VITE_APP_EMAILJS_PUBLIC_KEY=VB6AFLYgeG81Kftru  # Clé publique
VITE_APP_EMAILJS_SERVICE_ID=service_u2f80ks    # Identifiant de service
VITE_APP_EMAILJS_TEMPLATEID=template_g18y085   # Identifiant de modèle
```   
- Vous devrez également les ajouter comme variables d'environnement dans le tableau de bord de **Cloudflare PAges** pour que cela fonctionne en production. 

--------------------------------------------------------------------------------------------------------------------------------

<div id="liste-pre-requis"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Liste pré-requis   

- Aucun pré-requis n'est nécessaire.   

- Application conçue avec les technologies suivantes :   
  &nbsp;   

  - **React** ``v18.3.1`` ➔ [Documentation React](https://fr.react.dev/)   
  - **Vitejs** ``v5.1.0`` ➔ [Documentation Vitejs](https://vitejs.dev/)   
  - **Remix** ``v2.13.1`` ➔ [Documentation Remix](https://remix.run/)   
  - **Three.js** ``v0.169.0`` ➔ [Documentation Three.js](https://threejs.org/)   
  - **Node.js** ``v.20.9.0`` ➔ [Documentation Node.js](https://nodejs.org/fr)   
  - **Npm** ``v10.8.1`` ➔ [Documentation et téléchargement de Npm](https://www.npmjs.com/)   
  - **Tailwind CSS** ``v3.4.4`` ➔ [Documentation Tailwind CSS](https://tailwindcss.com/)   
  - **VSCode** ``v1.85.2`` ➔ [Documentation et téléchargement de VSCode](https://code.visualstudio.com/)   
  - **Chrome** ``v.126.0.6478.114`` & **Firefox** ``v.127.0``     
  - **Windows 10** ``Professionnel``   

--------------------------------------------------------------------------------------------------------------------------------

<div id="lancement-application"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Lancement de l'application   

- Pour lancer l'application.   

#### 1. Installer *Node.js* (inclut *npm*)   

  - Si **Node.js** n'est pas encore installé sur votre machine, il peut être téléchargé ici ➔ [Téléchargement Node.js](https://nodejs.org/fr)   
  - Cela installera :   
    - À la fois les dépendances de production (comme **react** et **react-dom**)   
    - Et les dépendances de développement (comme **Vite**, **Three.js**, etc.)   
  &nbsp;   

#### 2. Installer les dépendances   

  - Dans un terminal exécuter la commande suivante dans le répertoire du projet.   
  - Cela installera toutes les dépendances spécifiées dans le fichier ``package.json`` ➔ ([package.json](package.json)).   

```bash   
$ npm install
```   

- Pour lancer le projet en mode développement.   
- Cela permettra d'accéder a la page ➔ http://localhost:5173/   

```bash
$ npm run dev
```   

>_**Note navigateur :** Les tests ont était fait sur **Firefox** et **Google Chrome**._  

--------------------------------------------------------------------------------------------------------------------------------

<div id="correction-application"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Correction *renderToReadableStream*   

- Si après avoir exécutée la commande **npm run dev** vous obtenez l'erreur suivante :   


```bash
[vite] Error when evaluating SSR module /node_modules/@remix-run/dev/dist/config/defaults/entry.server.cloudflare.tsx: failed to import "react-dom/server"
[vite] Named export 'renderToReadableStream' not found.
The requested module 'react-dom/server' is a CommonJS module, which may not support all module.exports as named exports.       
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'react-dom/server';
const {renderToReadableStream} = pkg;
```  

- Il faudra modifier le fichier **entry.server.cloudflare.tsx** à l'emplacement suivant :   

```bash   
/node_modules/@remix-run/dev/dist/config/defaults/entry.server.cloudflare.tsx
```   

- Cela contourne l'utilisation de **renderToReadableStream** et utilise **renderToString**, ce qui est souvent plus compatible.   


```tsx   
# Fichier entry.server.cloudflare.tsx (après modifications)

import * as isbotModule from "isbot";
import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext,
    loadContext: AppLoadContext
) {
    let body = '';

    try {
        body = renderToString(
            <RemixServer context={remixContext} url={request.url} />
        );
    } catch (error) {
        // Log streaming rendering errors from inside the shell
        console.error('Rendering error:', error);
        responseStatusCode = 500;
    }

    if (isBotRequest(request.headers.get("user-agent"))) {
        // If the request is from a bot, wait for the body to be ready (if necessary)
        // In this case, we're assuming no need to wait for anything since we're not streaming
    }

    responseHeaders.set('Content-Type', 'text/html');
    return new Response(body, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}

function isBotRequest(userAgent: string | null) {
    if (!userAgent) {
        return false;
    }

    // isbot >= 3.8.0 or >= 4
    if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
        return isbotModule.isbot(userAgent);
    }

    // isbot < 3.8.0
    if ("default" in isbotModule && typeof isbotModule.default === "function") {
        return isbotModule.default(userAgent);
    }

    return false;
}
```   

--------------------------------------------------------------------------------------------------------------------------------

<div id="auteur-contact"></div>
<a href="#top" style="float: right;">Retour en haut 🡅</a>

### Auteur, contact et remerciements   

- Pour toute information supplémentaire, vous pouvez me contacter.   
  À l'adresse suivante **Bubhux :** bubhuxpaindepice@gmail.com 
  &nbsp;

- Un remerciement particulier au concepteur du projet original.  
  Inspiré et basé sur le projet de **Hamish Williams** ➔ GitHub : https://github.com/HamishMW/portfolio
