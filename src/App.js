import { useState } from "react";

import Editor from "@monaco-editor/react";
import Select from "@material-ui/core/Select";

import editorjson from "./json/editor.json";

import "./scss/home.scss";

import axios from "axios";

function App() {
  const [Language, setLanguage] = useState("cpp");
  const [Code, setCode] = useState(editorjson);

  const langs = ["cpp", "python", "c"];

  const [Input, setInput] = useState("");
  const [Output, setOutput] = useState("");

  const HandleCode = (e) => {
    setCode((value) => {
      return {
        ...value,
        [Language]: {
          ...value[Language],
          code: e,
        },
      };
    });
    console.log(Code);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleRun = () => {
    const data = {
      code: Code[Language].code,
      input: Input,
      lang: Language,
    };


    axios
      .post("https://idedockerdemo.herokuapp.com/run", data)
      .then((res) => {
        console.log(res.data);
        const output = res.data.stdout + res.data.stderr;

        let newText = output.split("\n").map((i) => {
          return <p>{i}</p>;
        });
        console.log(newText);
        setOutput(newText);

      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <div className="Grid">
        <div className="l1">
          <div className="dropdown">
            <select
              className="dropdown"
              value={Language}
              onChange={(event) => setLanguage(event.target.value)}
              native
              label="Language"
            >
              {langs.map((lang, index) => {
                return (
                  <option value={lang} key={index}>
                    {lang}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="editor">
            <Editor
              theme="vs-dark"
              height="85vh"
              defaultLanguage={Language}
              defaultValue={Code[Language].code}
              value={Code[Language].code}
              onChange={HandleCode}
            />
          </div>
          <div className="Run">
            <button onClick={handleRun}>Run</button>
          </div>
        </div>

        <div className="l2">
          <div className="input">
            <h1>Input</h1>
            <textarea
              placeholder="Enter Your Input"
              value={Input}
              onChange={handleInput}
            />
          </div>
          <div className="output">
            <h1>Output</h1>
            <div className="output">{Output}</div>
          </div>
        </div>
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
