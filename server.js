let app = require('./app')
const PORT = process.env.PORT || 4000;
app.listen(PORT, function(){
    console.log(`listening on  http://localhost:${PORT}`)
})