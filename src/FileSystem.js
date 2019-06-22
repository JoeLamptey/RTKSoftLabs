//import fs from 'fs'
//import {dirname} from 'path'

let fs = require('fs')

//let pathname = 'liya ventures'

let readLicFile =()=>{
    fs.readFileSync('./licenses/liya ventures.lic',"utf8",(err, data)=>{
        if(err) throw err
        console.log(data)
    })
}

export default  readLicFile