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

  function onDocumentLoadFailure() {
    console.error("Failed fetching Forge manifest");
  }
}
