const fs = require('fs');
const path = require('path');

const directoryPath = '/Users/aaron/Desktop/Notes Island'; // Replace with the actual path
const targetString = 'transformed'; // Replace with the desired search string

fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error stating file:', err);
          return;
        }
  
        if (stats.isFile() && path.extname(file) === '.md') {
        //   console.log('Processing Markdown file:', filePath);
  
          fs.readFile(filePath, 'utf8', (err, fileContents) => {
            if (err) {
            //   console.error('Error reading file:', err);
              return;
            }
  
            if (fileContents.includes(targetString)) {
              console.log('File contains the target string:', filePath);
            } else {
            //   console.log('File does not contain the target string:', filePath);
            }
          });
        }
      });
    });
  });