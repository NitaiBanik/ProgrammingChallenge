const express = require('express');
const app = express();

const port = 6030;

app.get('/ping', (request, response) => {
    response.send("Ping");
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});