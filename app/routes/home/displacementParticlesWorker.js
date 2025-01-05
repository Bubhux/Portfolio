// app/routes/home/displacementParticlesWorker.js

self.onmessage = (event) => {
    if (event.data === 'start') {
        const startTime = Date.now();
        let time = 0;

        // Met à jour la valeur 'time' régulièrement
        setInterval(() => {
            time = 0.00005 * (Date.now() - startTime);
            self.postMessage(time); // Envoie la valeur du temps au thread principal
        }, 16); // Envoie toutes les 16ms (environ 60fps)
    }
};
