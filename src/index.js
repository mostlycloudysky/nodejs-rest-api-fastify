const { get } = require('http')
const routes = require('./routes/index')

require('dotenv').config()


// @ts-ignore
const fastify = require('fastify')({ logger: true })

fastify.get('/', async(request, reply) => {
    return {hello: 'World'}
})

routes.forEach((route, index) => {
    fastify.route(route)
})

const mongoose = require('mongoose')
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DB_NAME = process.env.DB_NAME
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.xhh56.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(`${err}`)); 

const start = async() => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`Server is listening on ${fastify.server.address().port}`)
    }catch(err) {
        fastify.log.error(err);
        process.exit(1)
    }
}

start()