const router = require('express').Router();
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
const saltRounds = 8

const SECRET_KEY = process.env.SECRET_KEY 


const verifyIC = async (input, userArr) =>{
    const arr = []
  for(let i = 0; i< userArr.length; i++){
    const match = await bcrypt.compare(input,userArr[i].icfirst)
    arr.push(match)   
  }
  if( arr.indexOf(true) == -1){
    return null
  } else {
    return userArr[arr.indexOf(true)]
  }
} 




//## Login
router.post("/login", async (req, res, next) => {
    // const { username, password } = req.body;
const data = req.body
// console.log(data)
const message = ""
try {
    const firstHalf = data.ic.slice(0,5)
    const users = await prisma.patient.findMany({ where : {icsecond : "888A"}})
    patientExist = await verifyIC(firstHalf,users)
    if (patientExist) {
        patient=patientExist
        // console.log(patientExist)
        match = await bcrypt.compare(data.pw, patient.pw)
        const accessToken = jwt.sign({patient,role:"user"}, process.env.SECRET_KEY,{expiresIn:"1h"})// need more work
        if(match){
            res.json(accessToken)// need to build decoder, and other auth function
            } else {
                res.status(404).json({status:"Failed", msg:"Incorrect User or Password"})
            }
    } else {
        res.json({status:"Failed", msg:"No Record(s) Found"})
    }
    
   






    // if (username === "admin" && password === "admin") {
    //     const token = jwt.sign({ username, role: "user" }, SECRET_KEY,{expiresIn:"1h"})
    //     res.status(200).send({ status: "ok", msg: token})
    // } else {
    //     res.status(401).send({ status: "error", msg: "No access"})
    // }
    // res.send(patient)

} catch (error) {
    next(error)
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