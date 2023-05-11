const Project = require('../models/project')
const SpaceFun = require('../models/spaceFun')

const spaceFun = async (req, res) => {

    try {
        const spacefunfound = await SpaceFun.findOne({ _id: '6458db96e8bd7ee58f9d7569' }) //finds specific spacefun + project
        console.log(spacefunfound, 'Space fun found')

        const spaceFun = await SpaceFun.find({}).populate('project')
        if (!spaceFun) throw new Error('No Fun')

        res.json(spaceFun)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { spaceFun }

/* exports.findAll = async () => {

    try {
        const spaceFun = await SpaceFun.find({})
        if (!spaceFun) throw new Error('No Fun')
        res.status(200).json(spaceFun)
    } catch(err) {
        res.status(500).json({ message: error.message })
    }
  } */
// const GetALL = async() => {
//     try {
//         const spaceFun = await SpaceFun.find({})
//         if (!spaceFun) throw new Error('No Fun')
//         res.status(200).json(spaceFun)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// }
