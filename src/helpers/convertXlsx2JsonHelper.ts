//npm install xlsx
//from: https://www.youtube.com/watch?v=1XUJgdFRK2M

export function getHourlyForecastFromXlsx() {
    //const xlsx = require ('xlsx');
    //const fs = require ('fs');

    //read Excel-File and write into wb (workbook)
    const workbook = xlsx.readFile('./tmp/281021_FW_Wetterdaten_HS_Reutlingen.xlsx');
    //const wb = xlsx.readFile('./tmp/blubb.xlsx');
    //show sheetnames
    //console.log(wb.SheetNames);
    //read sheet from workbook and write into ws (worksheet)
    const worksheet = workbook.Sheets['Tabelle1'];
    //read cells
    //console.log(ws['C8']);

    //read sheet data and convert it into json
    console.log('fülle Data');
    const data = xlsx.utils.sheet_to_json(worksheet, {range: 'A8:C31', header:['hour','temperature','globalHorizontalIrradiance']});
    console.log(data)
}