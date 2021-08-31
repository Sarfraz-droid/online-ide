const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
var cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const {c, cpp, python, java} = require('compile-run');
app.use(bodyParser.json());

app.use(cors())

app.get('/', function(req, res)
{
    res.send("Hello World!");
})


app.post("/run", function (req, res) {
    console.log("in output")
    // compiler.compile(lang,code, input,(data) => {
    //     console.log(data);
    //     res.send(data);
    // })
    console.log(req.body);
    // console.log(data);
    const lang = req.body.lang;
    const code = req.body.code;
    const input = req.body.input;
    let resultPromise;

    switch(lang) {
        case "cpp":
            resultPromise = cpp.runSource(code,{
                stdin: input,
            });
            break;

        case "c":
            resultPromise = c.runSource(code,{
                stdin: input,
            });
            break;
        
        case "java":

            resultPromise = java.runSource(code,{
                stdin: input,
            });
            break;

        case "python": 
            resultPromise = python.runSource(code,{
                stdin: input,
            });
            break;
    }


    resultPromise
    .then(result => {
        console.log(result);
        res.json(result);
    })
    .catch(err => {
        console.log(err);
    });
    // compiler.compile(2, code, "", (data) => {
    //     console.log(data);
    //     res.send(data);
    // })
    
});

const Port = process.env.PORT || 5000

app.listen(Port, function (req, res) {
  console.log("listening on port " + Port);
});
