const { Router } = require('express')
const SpaceFun = require('../models/spaceFun')
const { spaceFun } = require('../controllers/spaceFunController')
//const cors = require('cors')

const router = Router()



router.get('/', spaceFun )

// async (req, res) => {
//     controller.spaceFun()
//    /*  try {
//         // controller.findAll();
//          const spaceFun = await SpaceFun.find({})
//          if (!spaceFun) throw new Error('No Fun')
//          res.status(200).json(spaceFun)
//      } catch (error) {
//          res.status(500).json({ message: error.message })
//      }   */
// })


module.exports = router