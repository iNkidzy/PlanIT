const spaceFun = require('../models/spaceFun')

const createSpaceFun = async (req,res) => {
    data = req.body;

    spaceFun.insertMany(data)
    .then(data => { res.send(data)})
    .catch(err => {res.status(500).send({message: err.message}) 
    })
}
const getAllSpaceFuns = async (req,res) => {
    spaceFun.find()
    .then(data => { res.send(data)})
    .catch(err => {res.status(500).send({message: err.message}) 
    })
}
const getSpecificSpaceFun = async (req,res) => {
    spaceFun.findById(req.params.id)
    .then(data => { res.send(data)})
    .catch(err => {res.status(500).send({message: err.message}) 
    })
}

const updateSpaceFun = async (req,res) => {
    const id = req.params.id
    const body = req.body

    spaceFun.findByIdAndUpdate(id, body)
    .then(data => { !data ? res.status(404).send({
        message: "Cannot update SpaceFun with id:" + id + ".Try Again!"
    }) : res.send({ message: "SpaceFun successfully updated!"})
    })
    .catch(err => {res.status(500).send({message: "Error updating SpaceFun with id:" + id}) 
    })
}

const deleteSpaceFun = async (req,res) => {
    const id = req.params.id

    spaceFun.findByIdAndDelete(id)
    .then(data => {res.send({ message: "SpaceFun successfully deleted!"})
    })
    .catch(err => {res.status(500).send({message: "Error deleting SpaceFun with id:" + id }) 
    })
}


module.exports = {createSpaceFun, getAllSpaceFuns, getSpecificSpaceFun, updateSpaceFun,deleteSpaceFun}

// const spaceFun = async (req, res) => {

//     try {
//         //Finds projct by id
//         const spacefunfound = await SpaceFun.findOne({ _id: '6458db96e8bd7ee58f9d7569' })
//         console.log(spacefunfound, 'Space fun found')
//         //populates project and displays spacefuns
//         const spaceFun = await SpaceFun.find({}).populate('project') //populates the project property on model
//         res.json(spaceFun)

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }