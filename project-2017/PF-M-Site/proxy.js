const express = require('express')
const axios = require('axios')
const app = express()

const { HOST = 'http://center.paint-future.com', PORT = '3300' } = process.env

app.use('/main*', (req, res) => {
    let method = req.method.toLowerCase()
    console.log(HOST + req.originalUrl)
    let pathUrl = req.originalUrl
    let sreq
    if (pathUrl.startsWith('/main/filemanager')) {
        sreq = axios({
            method: method,
            url: HOST + req.originalUrl,
            responseType:'stream'
        })
    } else {
        sreq = axios[method](HOST + req.originalUrl)
    }
    sreq.then(response => {
        if (pathUrl.startsWith('/main/filemanager')) {
            response.data.pipe(res)
        } else {
            res.json(response.data)
        }
    })
    .catch(error => {
        console.log(error)
    })
});

app.use('/', express.static('dist'))

app.listen(PORT, () => {
    console.log(`server running @${PORT}`)
})