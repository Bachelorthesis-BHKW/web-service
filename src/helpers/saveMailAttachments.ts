//npm install -g download-email-attachments --no-audit
//npm install moment or yarn add moment
//Unbedingt integrieren! Erste Antwort 2): https://stackoverflow.com/questions/26980816/how-can-download-email-attachment-node-js
  //2) If output name of the file is not coming well, just go to save-attachment-stream.js and for var generatedFileName remove .replace method.
  //  node_modules\download-email-attachments\lib\save-attachment-stream.js
  //  var generatedFileName = replaceTemplate(state.filenameTemplate,meta)//.replace(state.invalidChars, '_')
// import { EnergySystem } from "../models/EnergySystem";
import moment from "moment";

export async function saveMailAttachments() : Promise<void> {
  return new Promise(function (resolve, reject){
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'        //todo: Überprüfen, wie sich das Skript auf dem Server der Hochschule verhält; Wird SSL-Zertifikat akzeptiert oder muss die Überprüfung ausgeschaltet werden?

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const downloadsinceDate = moment().format('YYYY-MM-DD'); // seit heute
    //const downloadsinceDate = moment("2021-11-17").format('YYYY-MM-DD'); // seit angegebenem Datum
    // console.log(downloadsinceDate);

    function onEnd (result: any) {
      if (result.errors) {
        // console.log(result.error)
        console.log('reject-Aufruf erfolgreich')
        reject();
        return
      }
      // console.log(result)
      console.log(result.latestTime)
      console.log("download mail attachments: done")
      resolve();
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const downloadEmailAttachments = require('download-email-attachments');
      downloadEmailAttachments({
        //invalidChars: /[^A-Z]/g, //Regex of Characters that are invalid and will be replaced by _
        account: '"RRI.Flexbetrieb@reutlingen-university.de":k4uD3rWe!sch@exchange.reutlingen-university.de:993', // all options and params besides account are optional
        directory: './tmp',
        //filenameTemplate: '{day}-{filename}',
        filenameFilter: /.xlsx?$/,
        timeout: 10000,
        log: {warn: console.warn, debug: console.info, error: console.error, info: console.info },
        since: downloadsinceDate,
        lastSyncIds: ['234', '234', '5345'], // ids already dowloaded and ignored, helpful because since is only supporting dates without time
        attachmentHandler: function attachmentHandler(attachmentData: any, callback: any, errorCB:any){
          console.log(attachmentData.filename);
          callback()
        }
      }, onEnd)
    } catch {
      reject();
    }
  })
}

//test
