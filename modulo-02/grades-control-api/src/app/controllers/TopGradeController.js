import { ready } from "../../arquivos/file";

class TopGradeController {
  async getTopGrade(req, res) {
    try {
      const grade = req.query;

      const json = JSON.parse(await ready());

      var grades = json.grades.filter(gr =>
          gr.subject.toLowerCase() === grade.subject.toLowerCase()
          && gr.type.toLowerCase() === grade.type.toLowerCase()
      );

      grades = grades.sort((a, b) => b.value - a.value).slice(0, 3);

      res.send(JSON.stringify(grades));

    } catch (err) {
        res.status(500).send(err.message);
    }
  }
}

export default new TopGradeController();
