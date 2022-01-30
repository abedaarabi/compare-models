import React from "react";
import "./App.scss";
import SelectParam from "./components/indexVaule/SelectParam";
import InputProject from "./components/inputProject/InputProject";
import Main from "./components/main/Main";

import { fetchProject } from "./helper/fetchProjects";
const projects = fetchProject("http://localhost:9090/");

function App() {
  const [projectItems, setProjectItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadParams, setLoadParams] = React.useState([]);
  const [responseDiffId, setResponseDiffId] = React.useState();

  function getProjectInfo(project) {
    setProjectItems([]);

    const items = fetchProject(`http://localhost:9090/projects/${project.id}`);
    setIsLoading(true);
    items.then((data) => {
      setProjectItems(data);
      setIsLoading(false);
      console.log(data);
    });
  }
  function getParamFromUi(rvtParam) {
    console.log({ rvtParam, responseDiffId });

    const projects = fetchProject(
      `http://localhost:9090/query/${responseDiffId.projectId}/${responseDiffId.diffId}/${rvtParam}`
    );
    return projects.then((data) => {
      console.log(data);
    });
  }

  function getItemInfo(item) {
    console.log(item);
    const projectId = item.projectId.split(".")[1];
    const url = item.versionId.split("?")[0];
    const currVersion = Number(item.versionId.split("=")[1]);
    const preVersion = Number(item.versionId.split("=")[1]) - 1;
    console.log({ projectId, url, currVersion, preVersion });

    if (currVersion > 1) {
      const projects = fetchProject(
        `http://localhost:9090/diff/${projectId}/${url}/${currVersion}/${preVersion}`
      );
      return projects.then((data) => {
        setLoadParams(data.uiSelectFields);
        setResponseDiffId(data.queryInfo);
      });
    } else {
      alert("version dose not have prevuse ");
    }
  }

  return (
    <div className="App">
      {/* <Navbar /> */}
      <InputProject projects={projects} getProjectInfo={getProjectInfo} />
      <Main
        projectItems={projectItems}
        isLoading={isLoading}
        getItemInfo={getItemInfo}
      />
      <SelectParam loadParams={loadParams} getParamFromUi={getParamFromUi} />
    </div>
  );
}

export default App;
