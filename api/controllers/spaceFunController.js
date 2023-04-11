const SpaceFun = require('../models/spaceFun')

const spaceFun = async(req , res) => {
 
    try {
        console.log("stuff")
        const spaceFun = await SpaceFun.find({})
        if (!spaceFun) throw new Error('No Fun')
   
        res.json(spaceFun) //.json(spaceFun) 
        
    } catch(error) {
        console.log("nope")
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
