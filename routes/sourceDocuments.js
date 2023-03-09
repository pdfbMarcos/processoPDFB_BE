const db = require("../models/sourceDocuments");
const express = require("express");
const router = express.Router();

router.get(
  "/:projeto/:caixa/:material/:lote/:type",
  async (req, res) => {
    const document = await db.selectSourceDocuments(
      req.params.projeto,
      req.params.caixa,
      req.params.material,
      req.params.lote,
      req.params.type
    );
    if (!document)
      return res
        .status(404)
        .send("Não foi encontrado nenhum documento para o projeto pesquisado.");
    res.send(document);
  }
);

module.exports = router;
