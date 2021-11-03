import React from "react";
import { useState } from "react/cjs/react.development";
import Card from "../ui/Card";
import classes from "./NewResourceForm.module.css";

const NewResourceForm = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [typeOption, setTypeOption] = useState("existing");

  function addResource(event) {
    event.preventDefault();

    const resource = {
      resourceType: type,
      resourceName: name,
    };

    if (!props.isEdit) {
      props.onAdd(resource);
    } else {
      props.onEdit(props.id, resource);
    }
  }

  return (
    <Card>
      <h2 className={classes.title}>
        {!props.isEdit ? "Add new resource" : "Edit resource"}
      </h2>
      <form className={classes.form} onSubmit={addResource}>
        <div className={classes.control}>
          <label htmlFor="name">Resource name</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="typeOption">New or existing type</label>
          <select
            type="text"
            required
            id="typeOption"
            onChange={(e) => setTypeOption(e.target.value)}
          >
            <option value="existing">Existing type</option>
            <option value="new">New type</option>
          </select>
        </div>
        {typeOption === "new" ? (
          <div className={classes.control}>
            <div className={classes.control}>
              <label htmlFor="newType">Add new type</label>
              <input
                type="text"
                required
                id="newType"
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className={classes.control}>
            <label htmlFor="typeOption">Add existing type</label>
            <select
              type="text"
              required
              id="existingType"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled selected>
                Select type
              </option>

              {props.resourceTypes.map((type) => (
                <option key={type.resourceType} value={type.resourceType}>
                  {type.resourceType}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={classes.actions}>
          <button>{!props.isEdit ? "Add resource" : "Edit resource"}</button>
        </div>
      </form>
    </Card>
  );
};

export default NewResourceForm;
