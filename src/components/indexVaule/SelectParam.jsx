import React from "react";
import "./selectParam.scss";
function SelectParam({ loadParams, getParamFromUi }) {
  const [selectedParam, setSelectedParam] = React.useState("");

  React.useEffect(() => {}, [loadParams]);
  return (
    <div className="selectParam-main">
      <div className="container">
        <div>
          <select
            className="chart-pie-model-select"
            onChange={(e) => {
              setSelectedParam(e.target.value);
            }}
          >
            <option value="0">---Select Param---</option>
            {loadParams &&
              loadParams
                .sort()
                .map((list, index) => <option key={index}>{list}</option>)}
          </select>
        </div>
        <div>
          <button onClick={() => getParamFromUi(selectedParam)}>
            get data
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectParam;
