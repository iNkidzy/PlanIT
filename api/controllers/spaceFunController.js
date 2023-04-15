const Bundle = require('../models/bundle')
const SpaceFun = require('../models/spaceFun')

const spaceFun = async(req , res) => {
 
    try {
        const spacefunfound = await SpaceFun.findOne({ _id: '643aa26410b6dbf248554532' }) //finds specific spacefun + bundle
        console.log(spacefunfound, 'Space fun found')

        const spaceFun = await SpaceFun.find({}).populate('bundle')
        if (!spaceFun) throw new Error('No Fun')
   
        res.json(spaceFun)
        
    } catch(error) {
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
