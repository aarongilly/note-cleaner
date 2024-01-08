const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // Still needed for parsing frontmatter

const directoryPath = '/Users/aaron/Desktop/Notes Island';
const targetString = 'SEARCH FOR NOTHING';
const replacementString = 'your_replacement_string';

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
                console.log('Processing Markdown file:', filePath);

                fs.readFile(filePath, 'utf8', (err, fileContents) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }

                    // Parse YAML frontmatter
                    const parsedContent = matter(fileContents);
                    const frontmatter = parsedContent.data;
                    const body = parsedContent.content;

                    // Remove "summary" property from frontmatter
                    delete frontmatter.summary;

                    // String replacement logic
                    const modifiedContents = parsedContent.toString(); // BARD GONE HALLUCINATING AGAIN
                    
                    if (modifiedContents !== fileContents) {
                        console.log('test')
                    //     // Content has been modified, write it back to the file
                    //     fs.writeFile(filePath, modifiedContents, 'utf8', (err) => {
                    //         if (err) {
                    //             console.error('Error writing file:', err);
                    //             return;
                    //         }
                    //         console.log('Target string replaced and "summary" property removed in file:', filePath);
                    //     });
                    // } else {
                    //     console.log('Target string not found in file:', filePath);
                    }
                });
            }
        });
    });
});