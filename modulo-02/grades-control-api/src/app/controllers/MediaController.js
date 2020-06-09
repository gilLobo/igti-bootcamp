import { ready } from "../../arquivos/file";

class MediaController {
  async getMedia(req, res) {
    try {
      const grade = req.query;

      const json = JSON.parse(await ready());

      var grades = json.grades.filter(gr =>
          gr.subject.toLowerCase() === grade.subject.toLowerCase()
          && gr.type.toLowerCase() === grade.type.toLowerCase()
      );

      const soma  = grades.reduce((acc, cur)=>acc + cur.value, 0);

      const media = soma / grades.length;

      res.send(`Média encontrada: ${media}`);

    } catch (err) {
        res.status(500).send(err.message);
    }
  }
}

export default new MediaController();
