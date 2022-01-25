const Autodesk = window.Autodesk;
export function loadModel(viewer, documentId) {
  Autodesk.Viewing.Document.load(
    documentId,
    onDocumentLoadSuccess,
    onDocumentLoadFailure
  );

  function onDocumentLoadSuccess(viewerDocument) {
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);
  }
  viewer.setLightPreset(10);
  viewer.setEnvMapBackground(false);
  viewer.fitToView();

  function onDocumentLoadFailure() {
    console.error("Failed fetching Forge manifest");
  }
}
