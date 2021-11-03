import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import NewResourceForm from "../components/resources/NewResourceForm";
import ResourcesList from "../components/resources/ResourcesList";

const RESOURCES_URL = "http://localhost:9000/resources";
const RESOURCES_TYPES_URL = "http://localhost:9000/resources/resourcetypes";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resourceTypes, setResourceTypes] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(RESOURCES_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResources(data);
        setIsLoading(true);
        fetch(RESOURCES_TYPES_URL)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setResourceTypes(data);
            setIsLoading(false);
          });
      });
  }, []);

  function addResource(resource) {
    fetch(RESOURCES_URL, {
      method: "POST",
      body: JSON.stringify(resource),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResources([...resources, data]);
      });
  }

  function deleteResource(resourceId) {
    fetch(RESOURCES_URL + "/" + resourceId, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response;
      })
      .then((data) => {
        setResources(
          resources.filter((resource) => resource.resourceId !== resourceId)
        );
      })
      .catch((error) => {
        alert("Deleting this resource is not allowed.");
      });
  }

  function updateResource(resourceId, resource) {
    fetch(RESOURCES_URL + "/" + resourceId, {
      method: "PUT",
      body: JSON.stringify(resource),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //setResources([...resources, data]);

        let index = resources.findIndex(x=> x.resourceId === resourceId);

        let oldResources = resources.slice();
        oldResources[index].resourceType = resource.resourceType;
        oldResources[index].resourceName = resource.resourceName;

        setResources(oldResources);
      });
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <div>
      <ResourcesList
        resources={resources}
        onDelete={deleteResource}
        resourceTypes={resourceTypes}
        onEdit={updateResource}
      />
      <NewResourceForm
        isEdit={false}
        resourceTypes={resourceTypes}
        onAdd={addResource}
      />
    </div>
  );
};

export default Resources;
