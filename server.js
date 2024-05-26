import net from 'node:net'
import fs from 'node:fs'
import readline from 'node:readline'

let server = net.createServer()

server.listen(5000, () => console.log('Server run on port 5000'))

// Read data
const filename = './data/zipcode.json'
let data = await fs.promises.readFile(filename, { encoding: 'utf-8' })
data = JSON.parse(data)

async function zipcodeResponder(socket) {
    function output(text, prompt = true) {
        socket.write(`${text}\n\r`)
        if (prompt) inputReader.prompt()
    }

    let inputReader = readline.createInterface({
        input: socket,
        output: socket,
        prompt: '>> ',
    })

    output('Type zip code number you wish to know about...\n\r"bye" to leave')
    for await (let inputLine of inputReader) {
        if (inputLine == 'bye') {
            output('See you next time!', false)
            return
        }
        else {
            const city = data.filter(c => c.zip_code == inputLine)[0]
            output(city ? JSON.stringify(city) : `There is no ${inputLine} zipcode in Madagascar!`)
        }
    }
}

server.on('connection', socket => {
    zipcodeResponder(socket)
        .then(() => socket.end())
        .catch(err => {
            console.error(err.message)
            socket.end()
        })
})
