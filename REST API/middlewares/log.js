module.exports = (req, res, next) => {
    console.log(`METHOD: ${req.method} -> URL: ${req.url}`)

    if( JSON.stringify(req.body) !== JSON.stringify({}) ){
        console.log(req.body)
    }

    next()
}