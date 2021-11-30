import React from "react";
import { useState } from "react";
import Card from "../ui/Card";
import NewResourceForm from "./NewResourceForm";
import classes from "./ResourceItem.module.css";

const ResourceItem = (props) => {
  const [update, setUpdate] = useState("");

  function deleteResource(event) {
    event.preventDefault();

    props.onDelete(props.id);
  }

  function updateResource(event) {
    event.preventDefault();

    setUpdate(true);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>Name: {props.name}</h3>
          <h3>Type: {props.type}</h3>
        </div>
        <div className={classes.delete}>
          <button onClick={deleteResource}>Delete</button>
        </div>
        <div className={classes.actions}>
          <button onClick={updateResource}>Edit</button>
        </div>
        {update ? (
          <NewResourceForm
            isEdit={true}
            id={props.id}
            resourceTypes={props.resourceTypes}
            onEdit={props.onEdit}
          />
        ) : (
          ""
        )}
      </Card>
    </li>
  );
};

export default ResourceItem;
