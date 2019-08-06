// namespaces
var dwv = dwv || {};
dwv.gui = dwv.gui || {};
dwv.gui.base = dwv.gui.base || {};

/**
 * Build the report HTML.
 * @param {Boolean} mobile Flag for mobile or not environement.
 */
dwv.gui.base.Report = function (app) {

    this.update = function (dataInfo) {
        // HTML node
        console.log(dataInfo);
        var imageType=dataInfo.find(function(data){return data.name==="ImageType"})
        var specificArrary=new Array();
        if(imageType !=null){
            specificArrary.push(imageType);
            var name =  dataInfo.find(function(data){return data.name === "PatientName"})
            var age = dataInfo.find(function(data){return data.name==="PatientSex"});
            var gender = dataInfo.find(function(data){return data.name==="PatientAge"});
            specificArrary.push(name);
            specificArrary.push(age);
            specificArrary.push(gender);
        }
        var reportEditNode = app.getElement("report-edit");
        var reportParentNode = reportEditNode.parentNode;
        var reportInfoNode = app.getElement("report-info");
        if (reportParentNode === null) {
            console.warn("Cannot find a node to append the DICOM tags to report.");
            return;
        }

        // remove table previous
        if (reportInfoNode != null) {
            reportParentNode.removeChild(reportInfoNode)
        }
        // exit if no tags
        if (dataInfo.length === 0) {
            console.warn("No DICOM tags to show.");
            return;
        }

        var newReportInfoNode = document.createElement("div");
        newReportInfoNode.className = "report-info";
        // tags HTML table
        var table;
        if(specificArrary.length>1){
            table = dwv.html.toTable(specificArrary);
        }
        else{
            table = dwv.html.toTable(dataInfo);
        }
      
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
        // append tags table
        newReportInfoNode.appendChild(table);
        reportParentNode.insertBefore(newReportInfoNode, reportEditNode)
        // refresh
        dwv.gui.refreshElement(table);
    };
}