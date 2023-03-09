const db = require("../models/documents");
const express = require("express");
const router = express.Router();

router.get(
  "/:projeto/:caixa/:material/:lote/:action/:type",
  async (req, res) => {
    const document = await db.selectDocuments(
      req.params.projeto,
      req.params.caixa,
      req.params.material,
      req.params.lote,
      req.params.action,
      req.params.type
    );
    if (!document)
      return res
        .status(404)
        .send("Não foi encontrado nenhum documento para o projeto pesquisado.");
    res.send(document);
  }
);

router.post("/", async (req, res) => {
  // const { error } = validateDocument(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const document = await db.insertDocument({
    caixa: req.body.caixa,
    material: req.body.material,
    lote: req.body.lote,
    loteCTRL: req.body.loteCTRL,
    dtPreparacao: req.body.dtPreparacao,
    projeto: req.body.projeto,
  });
  res.send(document);
});

router.put(
  "/:projeto/:caixa/:material/:lote/:loteCTRL/:action",
  async (req, res) => {
    const document =
      req.params.action === "cxs"
        ? await db.updateDocumentCxs(
            req.params.projeto,
            req.params.caixa,
            req.params.material,
            req.params.lote,
            req.params.loteCTRL,
            {
              dtCaixa: req.body.dtCaixa,
            }
          )
        : req.params.action === "rep"
        ? await db.updateDocumentRep(
            req.params.projeto,
            req.params.caixa,
            req.params.material,
            req.params.lote,
            req.params.loteCTRL,
            {
              caixaPDF: req.body.caixaPDF,
              qtdImg: req.body.qtdImg,
              dtReprep: req.body.dtReprep,
            }
          )
        : await db.updateDocumentDig(
            req.params.projeto,
            req.params.caixa,
            req.params.material,
            req.params.lote,
            req.params.loteCTRL,
            {
              lotePDF: req.body.lotePDF,
              qtdPag: req.body.qtdPag,
              doctoFP: req.body.doctoFP,
              dtCaptura: req.body.dtCaptura,
            }
          );
    res.send(document);
  }
);

/* router.delete("/:projeto/:caixa/:material/:lote", async (req, res) => {
  const document = await db.deleteDocument(
    req.params.projeto,
    req.params.caixa,
    req.params.material,
    req.params.lote
  );
  if (!document)
    return res
      .status(404)
      .send("Não foi encontrado nenhum documento para o projeto indicado.");

  res.send(document);
}); */

// function validateDocument(document) {
//   const schema = {
//     senha: Joi.string().min(3).required(),
//     perfil: Joi.string().max(3).min(3).required(),
//   };

//   return Joi.validate(document, schema);
// }

module.exports = router;
