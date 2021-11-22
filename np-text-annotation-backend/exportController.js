const writeXlsxFile = require("write-excel-file/node");

exports.exportDataToCSV = async (request, response) => {
    let annotationData = request.body.annotationData;
    let data = []
    for (let i = 0; i < annotationData.length; i++) {
        data.push([
            // Column #1
            {
              type: String,
              value: annotationData[i].image,
            },
            // Column #2
            {
              type: String,
              value: annotationData[i].text,
            },
        ])
    }

    await writeXlsxFile(data, {
        filePath: "./public/annotation.csv",
      });
    
    response.status(200).send({
    message: "Successful!",
    });
}