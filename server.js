import net from 'node:net'

let server = net.createServer()

server.listen(5000, () => console.log('Server run on port 5000'))
