import React from "react";
import "./App.scss";
import InputProject from "./components/inputProject/InputProject";
import Main from "./components/main/Main";

import { fetchProject } from "./helper/fetchProjects";
const projects = fetchProject("http://10.25.38.36:9090/");

function App() {
  const [projectItems, setProjectItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function getProjectInfo(id) {
    setProjectItems([]);

    const items = fetchProject(`http://10.25.38.36:9090/projects/${id}`);
    setIsLoading(true);
    items.then((data) => {
      setProjectItems(data);
      setIsLoading(false);
    });
  }

  return (
    <div className="App">
      {/* <Navbar /> */}
      <InputProject projects={projects} getProjectInfo={getProjectInfo} />
      <Main projectItems={projectItems} isLoading={isLoading} />
    </div>
  );
}

export default App;
