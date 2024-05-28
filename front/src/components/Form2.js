import React, { useState } from "react";

function Form(props) {
  const [titel, setTitel] = useState(String);
  const [rating, setRating] = useState(Number);

  function handleChange(e) {
    setTitel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!titel.trim()) {
      return;
    }
    props.addTask(titel);
    setTitel("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-titel-input"
        placeholder="Введите название Фильма"
        name="text"
        autoComplete="off"
        value={titel}
        onChange={(e)=> setTitel(e.target.value)}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
