import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Order = (props) => {
  const blankFormObj = {
    name: "",
    size: 0,
    Ham: false,
    Pinapple: false,
    Cheese: false,
    Oregano: false,
    instructions: "",
  };
  const [form, setForm] = useState(blankFormObj);
  const [errState, setErrState] = useState({ name: "" });
  const [btnAble, setBtnAble] = useState(true);
  // console.log(errState);
  // console.log(form);

  
  useEffect(()=>{ 
    schema.isValid(form).then((valid) => { 
      console.log(valid)
      setBtnAble(!valid); 
    }, [form]) 
  })

  
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Please tell us your name.")
      .min(2, "Must be a certain length."),
  });

  const validateNameInput = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrState({ name: "" });
        console.log(valid);
      })
      .catch((err) => {
        setErrState({ ...errState, name: err.errors[0] });
        console.log(err.errors[0]);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", form)
      .then((res) => {
        console.log(res.data);
        setForm(blankFormObj);
      })
      .catch((err) => {
        console.error(err);
        setForm(blankFormObj);
      });
  };

  const onChangeHandler = (e) => {
    const type = e.target.type === "checkbox" ? "checked" : "value";
    setForm({ ...form, [e.target.name]: e.target[type] });

    if (e.target.name === "name") {
      validateNameInput(e);
    }
  };

  return (
    <div>
      <div>Place your order here</div>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">
          {" "}
          Name:
          <input
            type="text"
            name="name"
            className="name"
            id="name"
            value={form.name}
            onChange={onChangeHandler}
          />
          {errState.name ? <div>{errState.name}</div> : null}
        </label>
        <br />
        <label htmlFor="size">
          <select
            name="size"
            id="size"
            value={form.size}
            onChange={onChangeHandler}
          >
            <option value="0">---WHAT SIZE DO YOU WANT?---</option>
            <option value="8">8 inches</option>
            <option value="10">10 inches</option>
            <option value="16">16 inches</option>
          </select>
        </label>
        <br />
        <div className="checkboxes">
          <label htmlFor="Ham">
            {" "}
            Ham
            <input
              type="checkbox"
              id="Ham"
              name="Ham"
              checked={form.Ham}
              onChange={onChangeHandler}
            />
          </label>
          <br />
          <label htmlFor="Pinapple">
            {" "}
            Pinapple
            <input
              type="checkbox"
              id="Pinapple"
              name="Pinapple"
              checked={form.Pinapple}
              onChange={onChangeHandler}
            />
          </label>
          <br />
          <label htmlFor="Extra Cheese">
            {" "}
            Extra Cheese
            <input
              type="checkbox"
              id="Cheese"
              name="Cheese"
              checked={form.Cheese}
              onChange={onChangeHandler}
            />
          </label>
          <br />
          <label htmlFor="Oregano">
            {" "}
            Oregano
            <input
              type="checkbox"
              id="Oregano"
              name="Oregano"
              checked={form.Oregano}
              onChange={onChangeHandler}
            />
          </label>
        </div>
        <br />
        <label htmlFor="instructions">
          Special instructions: <br />
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={onChangeHandler}
          />
        </label>
        <br />
        <button disabled={btnAble} id="submit-btn">CLICK TO PLACE YOUR ORDER NOW</button>
      </form>
    </div>
  );
};

export default Order;