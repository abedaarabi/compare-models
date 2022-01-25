import React from "react";
import { getToken } from "../../helper/getToken";
import { loadModel } from "../../helper/loadModels";
import "./main.scss";
const Autodesk = window.Autodesk;

// const documentId =
//   "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLno3Nl9BeU5CVEVDRjhJM243YTFLc2c_dmVyc2lvbj0yOA";

function Main({ projectItems, isLoading, projectName }) {
  const [documentId, setDocumentId] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");

  let viewerLeft;
  let viewerRight;

  const options = {
    env: "AutodeskProduction2",
    api: "streamingV2",
    getAccessToken: function (onTokenReady) {
      //  getToken().then((res) => setAccessToken(res));
      const token = accessToken;
      const timeInSeconds = 3600;
      onTokenReady(token, timeInSeconds);
    },
  };

  Autodesk.Viewing.Initializer(options, function () {
    viewerLeft = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("viewer-left")
    );
    viewerRight = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("viewer-right")
    );
    const startedCodeLeft = viewerLeft.start();
    const startedCodeRight = viewerRight.start();
    if (startedCodeLeft > 0 || startedCodeRight > 0) {
      console.error("Failed to create a Viewer: WebGL not supported.");
      return;
    }

    viewerLeft.addEventListener(
      Autodesk.Viewing.SELECTION_CHANGED_EVENT,
      function () {
        viewerRight.select(viewerLeft.getSelection());
      }
    );
    console.log("Initialization complete, loading a model next...");
  });

  React.useEffect(() => {
    getToken().then((res) => setAccessToken(res));
  }, []);

  React.useEffect(() => {
    if (accessToken) {
      loadModel(viewerLeft, documentId);
      loadModel(viewerRight, documentId);
    }
  }, [accessToken, documentId]);

  return (
    <div className="main">
      <div className="item-container">
        {isLoading ? (
          <div className="main-loading"> Loading Models....</div>
        ) : (
          <div className="project-items">
            {projectItems.map((items) => (
              <div
                className="item"
                key={items.derivativesId}
                onClick={() => {
                  items.derivativesId &&
                    setDocumentId("urn:" + items.derivativesId);
                }}
              >
                <p>{items.fileName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="viewer-container">
        <div id="viewer-left"></div>
        <div id="viewer-right"> </div>
      </div>
    </div>
  );
}

export default Main;
