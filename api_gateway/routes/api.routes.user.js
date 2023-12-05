const axios = require("axios");

module.exports = (app) => {
  app.post("/api/users/register", function (req, res) {
    axios
      .post(`http://localhost:8080/api/auth/register`, { ...req.body })
      .then(function (reponse) {
        const token = reponse.data.token;
        const expiresIn = 24 * 60 * 60 * 1000; // 24 hours

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: expiresIn,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });

        res.status(200).send(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: "Une erreur est survenue",
              error: erreur,
            },
          });
      });
  });

  app.post("/api/users/login", function (req, res) {
    axios
      .post(`http://localhost:8080/api/auth/login`, {
        ...req.body,
      })
      .then(function (reponse) {
        const token = reponse.data.token;
        const expiresIn = 24 * 60 * 60 * 1000; // 24 hours

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: expiresIn * 1000,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });

        res.status(200).send(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: "Une erreur est survenue",
            },
          });
      });
  });

  app.get("/api/auth/me", function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: "Aucun token fourni" } });
    }

    axios
      .get(`http://localhost:8080/api/auth/me`)
      .then(function (reponse) {
        const token = reponse.data.token;

        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 1,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });

        res.status(200).send(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: "Une erreur est survenue",
            },
          });
      });
  });
};
