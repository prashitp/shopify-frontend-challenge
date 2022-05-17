import React, { useState, useEffect } from "react";
import { Row, Input, Button } from "antd";
import Card from "./Card";
import axios from "axios";
const { TextArea } = Input;

function Home() {
  const [prompt, setPrompt] = useState();
  const [responses, setResponses] = useState([]);

  const onPromptChange = (event) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    const localResponses = JSON.parse(localStorage.getItem("myResponses") || "[]");
    console.log(localResponses);
    setResponses(localResponses.reverse());
  }, [localStorage.getItem("myResponses")])

  const submitClick = () => {
    const data = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const mySecret = process.env.REACT_APP_API_SECRET;

    axios
      .post(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mySecret}`,
          },
        }
      )
      .then((resp) => {
        const respObj = {
          prompt: prompt,
          response: resp.data.choices[0].text,
        };
        
        const localResponses = JSON.parse(localStorage.getItem("myResponses") || "[]");
        localResponses.push(respObj);
        localStorage.setItem("myResponses", JSON.stringify(localResponses));

        setPrompt();
      });
  };

  return (
    <Row>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bolder",
        }}
      >
        Shopify FrontEnd Challenge
      </h2>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "bolder",
        }}
      >
        Fun With AI
      </h2>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Enter prompt
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TextArea
          style={{ maxWidth: "80%", minWidth: "400px", padding: "0.5%" }}
          rows={10}
          onChange={onPromptChange}
          value={prompt}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{
            maxWidth: "40%",
            margin: "1%",
          }}
          variant="success"
          onClick={submitClick}
        >
          Submit
        </Button>
      </div>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Responses
      </h3>
      {responses.map((response, index) => {
        return (
          <Row key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0.5%",
              }}
            >
              <Card
                key={response}
                prompt={response.prompt}
                response={response.response}
              />
            </div>
          </Row>
        );
      })}
    </Row>
  );
}

export default Home;
