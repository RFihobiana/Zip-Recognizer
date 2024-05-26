import net from 'node:net'
import process from 'node:process'

let socket = net.createConnection(5000, process.argv[2] ?? 'localhost')
socket.pipe(process.stdout)
process.stdin.pipe(socket)

socket.on('close', () => process.exit())
