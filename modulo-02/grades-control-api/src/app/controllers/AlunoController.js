import { ready } from "../../arquivos/file";

class AlunoController {
  async getNota(req, res) {
    try {
      const grade = req.query;

      const json = JSON.parse(await ready());

      var grades = json.grades.filter(gr =>
          gr.student.toLowerCase() === grade.student.toLowerCase()
          && gr.subject.toLowerCase() === grade.subject.toLowerCase()
      );

      const soma  = grades.reduce((acc, cur)=>acc + cur.value, 0);

      res.send(`Nota encontrada: ${soma}`);

    } catch (err) {
        res.status(500).send(err.message);
    }
  }
}

export default new AlunoController();
