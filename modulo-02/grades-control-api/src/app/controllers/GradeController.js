import { ready, write } from "../../arquivos/file";

class GradeController {
  async store(req, res) {
    try {
      let grade = req.body;

      const json = JSON.parse(await ready());

      grade = { id: json.nextId++, ...grade };

      grade.timestamp = `${new Date().toISOString()}`;

      json.grades.push(grade);

      write(json);

      res.send(grade);

    } catch (err) {
        res.status(500).send(err.message);
    }
  }

  async getById(req, res) {
    try {
      const json = JSON.parse(await ready());

      const grade = json.grades.find(c => c.id === parseInt(req.params.id));

      if (grade === undefined)
          res.status(404).send("Registro não encontrado");

      res.send(JSON.stringify(grade));

    } catch (err) {
        res.status(500).send(err.message);
    }
  }

  async index(_, res) {
    try {
      const data = await ready();
      res.send(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
  }

  async update(req, res) {
    try {
      let grade = req.body;

      const json = JSON.parse(await ready());

      let index = json.grades.findIndex(ac => ac.id === grade.id);

      if (index === undefined)
          res.status(404).send("Registro não encontrado");

      grade.timestamp = `${new Date().toISOString()}`;

      json.grades[index] = grade;

      write(json);

      res.send(grade);

    } catch (err) {
        res.status(500).send(err.message);
    }
  }

  async remove(req, res) {
    try{
      const json = JSON.parse(await ready());

      const grade = json.grades.find(c => c.id === parseInt(req.params.id));

      if (grade === undefined)
          res.status(404).send("Registro não encontrado");

      json.grades = json.grades.filter(gr => gr.id != grade.id);

      await write(json);

      res.send(`Registro ${grade.id} excluído`);

    }catch (err) {
        res.status(500).send(err.message);
    }
  }

}

export default new GradeController();
