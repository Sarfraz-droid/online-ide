import { useState,useEffect} from "react";

import Editor from "@monaco-editor/react";

import uuid from 'react-uuid'
import firebase from "./firebase";
import { useParams ,useHistory } from "react-router-dom";

import editorjson from "./json/editor.json";

import "./scss/home.scss";
import styles from "./scss/Link.module.scss"

import axios from "axios";

function App() {

  const db = firebase.firestore();
  let id = new URLSearchParams(window.location.search).get("link");


  useEffect(() => {
    console.log(id);
    if(id !== null) 
    {
      db.collection("code").doc(id).get().then(doc => {
        if(doc.exists) {
          if(doc.data().code !== undefined) {
            setCode(doc.data().code);
            setLanguage(doc.data().language);
          }

        }
      })
    }
  }, [])

  const [Language, setLanguage] = useState("cpp");
  const [Code, setCode] = useState(editorjson);
  const history = useHistory();
  const langs = ["cpp", "python", "c"];

  const [Input, setInput] = useState("");
  const [Output, setOutput] = useState("");

  const [SaveSnackbar, setSaveSnackbar] = useState({
    success: true,
    opacity: 0,
  });

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

  const handleSave = () => {
    let uid = uuid();
    db.collection("code").doc(uid).set({
      code: Code,
      language: Language,
    }).then(() => {
      setSaveSnackbar({
        success: true,
        opacity: 1,
      });
    }).catch(()=> {
      setSaveSnackbar({
        success: false,
        opacity: 1,
      });
    });

    setTimeout(() => {
      setSaveSnackbar((value) => {
        return({
          ...value,
          opacity: 0,
        })
      });
    }, 3000);
    console.log("/?link=" + uid);
    history.push("/?link=" + uid );
  };

  

  const Snackbar = (succeeded) => {
    const success = {
      backgroundColor: succeeded ? "#43a047" : "#e53935",
      opacity: SaveSnackbar.opacity
    };
  

    return(
      <div className = "snackbar" style = {success}>
          {succeeded ? "Saved" : "Error"}
      </div>
    );
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
            <button className={styles["save"]} onClick={handleSave}>Save</button>
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
      {Snackbar(SaveSnackbar.success)}
    </div>
  );
}

export default App;
