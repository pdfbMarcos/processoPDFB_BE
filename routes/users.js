const db = require("../models/users");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await db.selectUsers();
  res.send(users);
});

router.get("/:usuario", async (req, res) => {
  const user = await db.selectUserbyUser(req.params.usuario);
  if (!user)
    return res.status(404).send("The user with the given NAME was not found.");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await db.insertUser({
    usuario: req.body.usuario,
    senha: req.body.senha,
    perfil: req.body.perfil,
  });
  res.send(user);
});

router.put("/:usuario", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await db.updateUser(req.params.usuario, {
    perfil: req.body.perfil,
  });
  res.send(user);
});

router.delete("/:usuario", async (req, res) => {
  const user = await db.deleteUser(req.params.usuario);
  if (!user)
    return res.status(404).send("The user with the given NAME was not found.");

  res.send(user);
});

function validateUser(user) {
  const schema = {
    senha: Joi.string().min(3).required(),
    perfil: Joi.string().max(3).min(3).required(),
  };

  return Joi.validate(user, schema);
}

module.exports = router;
