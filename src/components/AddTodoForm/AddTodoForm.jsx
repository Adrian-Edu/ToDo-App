import React, { useState } from "react";
import Input from "../input/Input";
import TextArea from "../input/TextArea";
import Button from "../button/Button";
import Card from "../card/Card";
import { useEffect } from "react";
import "./AddTodoForm.css";

const AddForm = (props) => {
  const [saveTitle, setSaveTitle] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    saveTitle: "",
    saveDescription: "",
    isValid: "",
  });
  const [buttonColor, setButtonColor] = useState("changeButtonColor");

  const handleInputChange = (e) => {
    setSaveTitle(e.target.value);
  };

  const handleTextAreaInput = (e) => {
    setSaveDescription(e.target.value);
  };

  const handleSubmite = (e) => {
    e.preventDefault();

    props.onAddTeam({
      title: saveTitle,
      description: saveDescription,
    });

    setSaveTitle("");
    setSaveDescription("");
  };

  useEffect(() => {
    if (saveTitle.length <= 2 && saveDescription.length <= 2) {
      setErrorMessage((prevState) => ({
        ...prevState,
        saveTitle: "The title should have at least 3 characters!",
        saveDescription: "The description should have at least 3 characters!",
        isValid: true,
      }));
    } else if (saveTitle.length <= 2) {
      setErrorMessage((prevState) => ({
        ...prevState,
        saveTitle: "The title should have at least 3 characters!",
        saveDescription: "",
        isValid: true,
      }));
    } else if (saveDescription.length <= 2) {
      setErrorMessage((prevState) => ({
        ...prevState,
        saveTitle: "",
        saveDescription: "The description should have at least 3 characters!",
        isValid: true,
      }));
    } else {
      setErrorMessage((prevState) => ({
        ...prevState,
        saveTitle: "",
        saveDescription: "",
        isValid: false,
      }));
    }
  }, [saveTitle, saveDescription]);

  useEffect(() => {
    if (errorMessage.isValid === true) {
      setButtonColor("changeButtonColor");
    } else {
      setButtonColor("primary-button");
    }
  }, [errorMessage]);

  return (
    <div>
      <Card>
        <h2>Create Todo</h2>
        <form onSubmit={handleSubmite}>
          <Input
            value={saveTitle}
            onChange={handleInputChange}
            placeholder="Title"
            type="text"
          />
          <span>{errorMessage.saveTitle}</span>
          <TextArea
            value={saveDescription}
            onChange={handleTextAreaInput}
            placeholder="Description"
          />
          <span>{errorMessage.saveDescription}</span>

          <Button
            className={` ${buttonColor} `}
            disabled={errorMessage.isValid}
            onClick={props.onCreateClick}
          >
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddForm;
