import React from "react";
import { getToken } from "../../helper/getToken";
import { loadModel } from "../../helper/loadModels";
import "./main.scss";
const Autodesk = window.Autodesk;

// const documentId =
//   "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLno3Nl9BeU5CVEVDRjhJM243YTFLc2c_dmVyc2lvbj0yOA";

function Main({ projectItems, isLoading, getItemInfo }) {
  const [documentId, setDocumentId] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");

  const leftViewerRef = React.useRef();
  const rightViewerRef = React.useRef();

  React.useEffect(() => {
    if (accessToken) {
      return;
    }
    getToken()
      .then((res) => {
        setAccessToken(res);
      })
      .then(() => {
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
          const viewerLeft = new Autodesk.Viewing.GuiViewer3D(
            document.getElementById("viewer-left")
          );
          const viewerRight = new Autodesk.Viewing.GuiViewer3D(
            document.getElementById("viewer-right")
          );

          const startedCodeLeft = viewerLeft.start();
          const startedCodeRight = viewerRight.start();
          leftViewerRef.current = viewerLeft;
          rightViewerRef.current = viewerRight;

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
          // loadModel(viewerLeft, "");
          // loadModel(viewerRight, "");
        });
      });
  }, [accessToken]);

  React.useEffect(() => {
    if (accessToken && leftViewerRef.current && rightViewerRef.current) {
      loadModel(leftViewerRef.current, documentId);
      loadModel(rightViewerRef.current, documentId);
    }
  }, [documentId, accessToken]);

  React.useEffect(() => {
    if (isLoading && leftViewerRef.current && rightViewerRef.current) {
      console.log(leftViewerRef.current);

      leftViewerRef.current.unloadModel();
      rightViewerRef.current.unloadModel();
    }
  }, [isLoading]);

  return (
    <div className="main">
      <div className="item-container">
        {isLoading ? (
          <div className="main-loading"> Loading Models....</div>
        ) : (
          <div className="project-items">
            {projectItems.map((item) => (
              <div
                className="item"
                key={item.derivativesId}
                onClick={() => {
                  item.derivativesId &&
                    setDocumentId("urn:" + item.derivativesId);
                  getItemInfo(item);
                }}
              >
                <p>{item.fileName}</p>
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
