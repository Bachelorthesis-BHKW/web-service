//from: https://www.youtube.com/watch?v=1XUJgdFRK2M
import xlsx from "xlsx";

export function XlsxToJson(xlsx_data: string, sheet_name: string, sheet_range: string, sheet_headers: string[]): any[] {
    try {
        const workbook = xlsx.readFile(xlsx_data);
        const worksheet = workbook.Sheets[sheet_name];
        return xlsx.utils.sheet_to_json(worksheet, {range: sheet_range, header: sheet_headers, dateNF:'dd-mm-yyyy'});
    } catch(error) {
        return error
    }
}

export function XlsxToJsonTimestamp(xlsx_data: string, sheet_name: string, sheet_range: string): any[] {
    const sheet_headers = ['date', 'time'];
    try {
        const workbook = xlsx.readFile(xlsx_data);
        const worksheet = workbook.Sheets[sheet_name];
        const data = xlsx.utils.sheet_to_json<any>(worksheet, {range: sheet_range, header: sheet_headers, raw: false});
        const timestamps = [];
        for (let i = 0; i<data.length; i++){
            timestamps[i] = {date: makeTimestamp(data[i].date, data[i].time)};
        }
        return timestamps;
    } catch(error) {
        return error
    }
}

function makeTimestamp(date: any, time: any): any{
    try{
        date = date.toString();
        const splittedDate= date.split("/");
        const month = zweistellig(splittedDate[0]);
        const day = zweistellig(splittedDate[1]);
        const year = "20"+zweistellig(splittedDate[2]);

        time = time.toString();
        const splittedTime= time.split(":");
        const hour = zweistellig(splittedTime[0]);
        const minute = zweistellig(splittedTime[1]);
        const seconds = "00.000";
        const timezone = "+00:00";

        const timestamp = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds+" "+timezone;
        return timestamp;

    }
    catch (error){
        console.error("ungültiges Datumsformat. "+error)
    }
}

function zweistellig(zahl: any): any{
    if (zahl.length < 2){
        return "0"+zahl;
    }
    else{
        return zahl;
    }
}
