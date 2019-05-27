// namespaces
var dwv = dwv || {};
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Build the report HTML.
 * @param {Boolean} mobile Flag for mobile or not environement.
 */
dwv.gui.base.Report = function (app) {

    this.update = function (dataInfo)
    {
        // HTML node
        var node = app.getElement("report");
        if( node === null ) {
            console.warn("Cannot find a node to append the DICOM tags.");
            return;
        }
        // remove possible previous
        while (node.hasChildNodes()) {
            node.removeChild(node.firstChild);
        }

        // exit if no tags
        if (dataInfo.length === 0) {
            console.warn("No DICOM tags to show.");
            return;
        }

        // tags HTML table
        var table = dwv.html.toTable(dataInfo);
        table.className = "reportTable";

        // optional gui specific table post process
        dwv.gui.postProcessTable(table);

        // check processed table
        if (table.rows.length === 0) {
            console.warn("The processed table does not contain data.");
            return;
        }

        // translate first row
        dwv.html.translateTableRow(table.rows.item(0));

        // append search form
        node.appendChild(dwv.html.getHtmlSearchForm(table));
        // append tags table
        node.appendChild(table);

        // refresh
        dwv.gui.refreshElement(node);
    };
}