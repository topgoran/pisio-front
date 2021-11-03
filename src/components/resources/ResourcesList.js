import React from "react";
import ResourceItem from "./ResourceItem";
import classes from './ResourceList.module.css'

const ResourcesList = (props) => {
  function deleteResource(resourceId) {}

  return (
    <div>
      <ul className={classes.list}>
        {props.resources.map((resource) => (
          <ResourceItem
            key={resource.resourceId}
            id={resource.resourceId}
            name={resource.resourceName}
            type={resource.resourceType}
            onDelete={props.onDelete}
            resourceTypes={props.resourceTypes}
            onEdit={props.onEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default ResourcesList;
