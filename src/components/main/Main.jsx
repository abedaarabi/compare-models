import React from "react";
import { getToken } from "../../helper/getToken";
import "./main.scss";
const Autodesk = window.Autodesk;

function loadModel(viewer, documentId) {
  Autodesk.Viewing.Document.load(
    documentId,
    onDocumentLoadSuccess,
    onDocumentLoadFailure
  );

  function onDocumentLoadSuccess(viewerDocument) {
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);
  }

  function onDocumentLoadFailure() {
    console.error("Failed fetching Forge manifest");
  }
}

const documentId =
  "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLjlDbWlmVHA4VEgtNkVSQXFmQWtIbmc_dmVyc2lvbj00";
function Main() {
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
  }, [accessToken]);

  return (
    <div className="main">
      <div id="viewer-left"></div>
      <div id="viewer-right"> </div>
    </div>
  );
}

export default Main;
