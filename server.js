const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
var cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const {c, cpp, node, python, java} = require('compile-run');
app.use(bodyParser.json());

app.use(cors())


app.post("/run", function (req, res) {
    console.log("in output")
    // compiler.compile(lang,code, input,(data) => {
    //     console.log(data);
    //     res.send(data);
    // })
    console.log(req.body);
    // console.log(data);

    const code = req.body.code;
    const input = req.body.input;
    let resultPromise = cpp.runSource(code,{
        stdin: input,
    });
    resultPromise
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
    // compiler.compile(2, code, "", (data) => {
    //     console.log(data);
    //     res.send(data);
    // })
    
});


app.listen(5000, function (req, res) {
  console.log("listening on port 5000");
});
