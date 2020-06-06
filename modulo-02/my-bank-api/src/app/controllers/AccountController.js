import fs from 'fs';

class AccountController {
  async store(req, res) {
    const { body } = req;

    fs.readFile(global.fileName, 'utf8', (err, data) => {
      if (!err) {
        try {
          const json = JSON.parse(data);
          // eslint-disable-next-line no-plusplus
          const account = { id: json.nextId++, ...body };

          json.accounts.push(account);

          fs.writeFile(
            global.fileName,
            JSON.stringify(json),
            // eslint-disable-next-line no-shadow
            (err) => {
              if (err) {
                res.status(400).send({ error: err.message });
              }
              res.json({ sucess: 'Write file sucessful!' });
            }
          );
          // eslint-disable-next-line no-shadow
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      } else {
        res.status(400).send({ error: err.message });
      }
    });
  }

  async index(req, res) {
    fs.readFile(global.fileName, 'utf8', (err, data) => {
      if (!err) {
        try {
          const json = JSON.parse(data);
          delete json.nextId;
          res.json(json);
          // eslint-disable-next-line no-shadow
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      } else {
        res.status(400).send({ error: err.message });
      }
    });
  }

  async getById(req, res) {
    const { id } = req.params;
    fs.readFile(global.fileName, 'utf8', (err, data) => {
      if (!err) {
        try {
          const json = JSON.parse(data);
          const accountResp = json.accounts.find(
            (account) => account.id === parseInt(id, 10)
          );
          if (accountResp) {
            res.json(accountResp);
          }
          res.end();
          // eslint-disable-next-line no-shadow
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      } else {
        res.status(400).send({ error: err.message });
      }
    });
  }
}

export default new AccountController();
