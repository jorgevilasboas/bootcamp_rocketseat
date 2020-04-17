const express = require('express')
const uuid = require('uuid')


const app = express();
app.use(express.json());
const PORT = 3333

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

const projects = [];

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
})


