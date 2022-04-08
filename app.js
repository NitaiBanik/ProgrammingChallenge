const express = require('express');
const app = express();
const port = 6030;

app.get('/Ping', (request, response) => {
    response.send('Pong');
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})