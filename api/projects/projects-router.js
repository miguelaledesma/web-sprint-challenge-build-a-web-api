// Write your "projects" router here!
const Projects = require('./projects-model'); 
const express = require('express'); 
const router = express.Router()

const {validateProjectId, validateProject} = require('./projects-middleware'); 

router.get("/", (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: 'The posts information could not be retrieved'})
        })
})

router.get("/:id", validateProjectId, (req,res, next) => {
    try{
        res.status(200).json(req.params)
    } catch(err){
        next(err)
    }
}); 

router.post("/", (req, res) => {
    const newProject = req.body; 
    Projects.insert(newProject)
    .then(project => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        res.status(400).json({message: "There was an error adding your project"})
    })
})

// router.put("/:id",validateProjectId ,validateProject,(req, res, next) =>{
//     const {name, description, completed} = req.body; 
//     if(!name || !description || !completed){
//         res.status(400).json({message: 'Project ID does not exist'})
//     } else {
//         Projects.update(req.params.id ,req.body)
//         .then(() => {
//           return Projects.get(req.params.id)
//         })
//         .then(project => {
//             res.json(project)
//         })
//         .catch(next)
//     }

// })


router.put("/:id",validateProjectId ,validateProject,(req, res, next) =>{

        Projects.update(req.params.id ,req.body)
        .then(() => {
          return Projects.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
    

})




router.delete("/:id", validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(res.Projects)
    } catch(err){
        next(err)
    }
})



module.exports = router