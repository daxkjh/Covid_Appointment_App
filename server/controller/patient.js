const router = require("express").Router()
const {PrismaClient} = require("@prisma/client")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 8

const prisma = new PrismaClient()

// ADMIN ACCESS ONLY
router.get("/", async (req,res,next)=>{
    try {
       const patients = await prisma.patient.findMany({})
       res.json(patients)
    } catch (error) {
        next(error)
    }
})

//Create Route - No Login
router.post ("/", async (req, res, next)=>{
    try {
        const reqData = await req.body
        console.log(reqData.ic)
        const firstHalf= await req.body?.ic.slice(0,5)
        const secondHalf = await req.body?.ic.slice(-4)
        const hashedFirstIC = await bcrypt.hash(firstHalf,saltRounds)
        
        newPatient = await prisma.patient.create({
            data: {
                    name: reqData.name,
                    icfirst: hashedFirstIC,
                    icsecond: secondHalf,
                    pw: await bcrypt.hash(reqData.pw, saltRounds)
    }})
        res.status(200).json({status:"success", message:"User Created"})
        
    } catch (error) {
        next(error)
    }
})

// Require Login
router.get("/:id", async (req,res,next)=>{
    
try {
    const {id} = req.params
    const patient = await prisma.patient.findFirst({
        // include:{slots : !slots ? slots:null},
        where: {id : parseInt(id)}
    })
    res.status(200).send(patient)
} catch (error) {
    next(error)
}

})














module.exports = router