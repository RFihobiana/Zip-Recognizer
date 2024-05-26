import net from 'node:net'
import fs from 'node:fs'

let server = net.createServer()

server.listen(5000, () => console.log('Server run on port 5000'))

// Read data
const filename = './data/zipcode.json'
let data = await fs.promises.readFile(filename, { encoding: 'utf-8'})
data = JSON.parse(data)



