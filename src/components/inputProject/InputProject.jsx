import React from "react";
import "./inputProject.scss";
function InputProject({ projects, getProjectInfo }) {
  const [allProject, setAllProject] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [projectName, setProjectName] = React.useState("");
  React.useEffect(() => {
    projects.then((data) => {
      setIsLoading(true);
      setAllProject(data);
      setIsLoading(false);
    });
  }, [search, projects]);

  let searchecProject;

  if (search === "") {
    searchecProject = [];
  } else {
    searchecProject = allProject.filter((project) => {
      return project.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  }

  return (
    <div className="container">
      <div>
        <h3>{projectName}</h3>
      </div>
      <div className="input-contents">
        <div>
          <input
            type="text"
            placeholder="search for project..."
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </div>
        <div className="projcets-name">
          {isLoading ? (
            <h1>loading....</h1>
          ) : (
            <div>
              {searchecProject.slice(0, 10).map((project) => (
                <div
                  key={project.id}
                  className="data-result"
                  onClick={() => {
                    getProjectInfo(project.id);
                    setProjectName(project.name);
                    console.log(search, "search");
                    setSearch("");
                  }}
                >
                  {project.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputProject;
