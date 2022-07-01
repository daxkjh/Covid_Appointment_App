const router = require('express').Router();
const jwt = require("jsonwebtoken")

//Test
// router.post("/login", (req,res)=>{
//     res.status(200).send(req.body)
// })

const SECRET_KEY = process.env.SECRET_KEY ?? "secret"

//## Login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
        const token = jwt.sign({ username, role: "user" }, SECRET_KEY,{expiresIn:"1h"})
        res.status(200).send({ status: "ok", msg: token})
    } else {
        res.status(401).send({ status: "error", msg: "No access"})
    }
})



//## Secret Route - via header (testing)
// router.get("/secret", (req, res) => {
//     const auth = req.headers.authorization;
//     const from  = req.headers.from
//     res.send({ status: "ok", msg: auth, from})
// })

//## secret - evolution
// router.get("/secret", (req, res) => {
//     const auth = req.headers.authorization;
//     if (!auth) {
//         res.status(401).send({ status: "error", msg: "No header"})

//     }
//     // const token = auth.slice(7)
//     const token = auth.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         if (decoded) {
//           res.send({ status: "ok", token, decoded, msg: "Some secret" });
//         } else {
//           res.status(401).send({ status: "error", msg: "No access" });
//         }
//       } catch (err) {
//         res.status(401).send({ status: "error", msg: "No access" });
//       }
//     });



    //## Secret -- Final (authorization,)
    //## Authentication middle ware
    const isAuth = (req, res, next) => {
        const auth = req.headers.authorization;
        if (!auth) {
          res.status(401).send({ status: "error", msg: "No header" });
        }
        const token = auth.split(" ")[1];
        try {
          const decoded = jwt.verify(token, SECRET_KEY);
          if (decoded.role === "user") {
            res.locals.user = decoded;
            next();
          } else {
            res.status(401).send({ status: "error", msg: "Access Denied" });
          }
        } catch (err) {
          res.status(401).send({ status: "error", msg: "No access" });
        }
      };


      //## ADMIN Check
      const isAdmin = (req, res, next) => {
        if (res.locals.user.role === "admin") {
          next();
        } else {
          res.status(401).send({ status: "error", msg: "Not admin" });
        }
      };

//## Secret Route
    router.get("/secret", isAuth, (req, res) => {
        res.send({ status: "ok", msg: "Some secret" ,user: res.locals.user});
      });
      
      
      router.get("/secret2", isAuth, (req, res) => {
          res.send({ status: "ok", msg: "More secret" });
        });

module.exports = router