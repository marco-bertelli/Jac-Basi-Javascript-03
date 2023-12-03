const fs = require('fs');

// Lista dei nomi dei file da leggere
const filesToRead = ['file1.txt', 'file2.txt', 'file3.txt'];

// Variabile per memorizzare il contenuto concatenato dei file
let concatenatedContent = '';

// Funzione per leggere il contenuto di ciascun file
function readFiles(fileList, index) {
  if (index >= fileList.length) {
    // Tutti i file sono stati letti, scrivi il contenuto concatenato in un nuovo file
    fs.writeFile('output.txt', concatenatedContent, 'utf8', (err) => {
      if (err) {
        console.error('Si è verificato un errore nella scrittura del file:', err);
        return;
      }
      console.log('Il contenuto dei file è stato scritto in output.txt');
    });
    return;
  }

  // Leggi il contenuto del file corrente
  fs.readFile(fileList[index], 'utf8', (err, data) => {
    if (err) {
      console.error(`Si è verificato un errore nella lettura di ${fileList[index]}:`, err);
      return;
    }
    
    // Aggiungi il contenuto del file corrente alla stringa concatenata
    concatenatedContent += data;
    
    // Passa al file successivo nella lista
    readFiles(fileList, index + 1);
  });
}

// Avvia la lettura dei file
readFiles(filesToRead, 0);
