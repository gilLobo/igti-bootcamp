import fs from 'fs';
import app from './app';

global.fileName = './src/arquivos/account.json';

app.listen(3333, () => {
  try {
    fs.readFile(global.fileName, 'utf8', (err) => {
      if (err) {
        const initialJson = {
          nextId: 1,
          accounts: [],
        };
        fs.writeFile(
          global.fileName,
          JSON.stringify(initialJson),
          // eslint-disable-next-line no-shadow
          (err) => {
            if (err) {
              // eslint-disable-next-line no-console
              console.log(err);
            }
          }
        );
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});
