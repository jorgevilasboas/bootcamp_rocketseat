const express = require('express')
const uuid = require('uuid')

const app = express();
app.use(express.json());
const PORT = 3333

const projects = [];

function logRequests(req, res, next) {
    const { method, url } = req

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

function validateProjectId(req, res, next) {
    const { id } = req.params

    const projectIndex = projects.findIndex(project => project.id === id)
    if (projectIndex < 0) {
        return res.status(400).json({ message: "Invalid project ID." })
    }

    return next()

}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (req, res) => {
    const { title } = req.query
    const results = title ? projects.filter(p => p.title.includes(title)) : projects
    return res.json(results)
})

app.post('/projects', (req, res) => {
    const { title, owner } = req.body

    const project = { id: uuid.v4(), title, owner }

    projects.push(project)

    return res.json(projects)
})


app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body
    const projectIndex = projects.findIndex(project => project.id === id)
    if (projectIndex < 0) {
        return res.status(400).json({ message: "Project not found" })
    }

    const project = { id, title, owner }

    projects[projectIndex] = project

    return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id)
    if (projectIndex < 0) {
        return res.status(400).json({ message: "Project not found" })
    }

    projects.splice(projectIndex, 1)

    return res.status(204).send()

})

app.listen(PORT, () => {
    console.log(`💻👂🏻Server is listening port ${PORT} ...`)

    /**
 * 
 * Query Params: Filtros e Paginação
 * const {title, owner} = request.query
 * 
 * Route Params:
 * Identificar na hora de atualizar
 * 
 *  * Request Body:
 * Conteúdo  {JSON}* 
 */

})


