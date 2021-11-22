//npm install -g download-email-attachments --no-audit
//npm install moment
//Unbedingt integrieren! Erste Antwort 2): https://stackoverflow.com/questions/26980816/how-can-download-email-attachment-node-js
  //2) If output name of the file is not coming well, just go to save-attachment-stream.js and for var generatedFileName remove .replace method.
  //  node_modules\download-email-attachments\lib\save-attachment-stream.js
  //  var generatedFileName = replaceTemplate(state.filenameTemplate,meta)//.replace(state.invalidChars, '_')

export function saveMailAttachments() {
    //const moment = require('moment');
    const downloadsinceDate = moment().format('YYYY-MM-DD'); // seit heute
    // const downloadsinceDate = moment("2021-11-17").format('YYYY-MM-DD'); // seit angegebenem Datum
    // console.log(downloadsinceDate);
  
    var onEnd = function (result) {
        if (result.error) {
          console.log(result.error)
          return
        }
        console.log("done")
        console.log(result.latestTime)
      }
     
      var downloadEmailAttachments = require('download-email-attachments');
      downloadEmailAttachments({
        invalidChars: /[^A-Z]/g, //Regex of Characters that are invalid and will be replaced by X
        //hier Passwort einfügen!                                                                       HIER!
        account: '"falko.tutsch@reutlingen-university.de/datenaustausch.selig@reutlingen-university.de":PASSWORTHIEREINFÜGEN!@exchange.reutlingen-university.de:993', // all options and params besides account are optional
        directory: './tmp',
        //filenameTemplate: '{day}-{filename}',
        filenameFilter: /.xlsx?$/,
        timeout: 3000,
        log: {warn: console.warn, debug: console.info, error: console.error, info: console.info },
        since: downloadsinceDate,
        lastSyncIds: ['234', '234', '5345'], // ids already dowloaded and ignored, helpful because since is only supporting dates without time
        attachmentHandler: function (attachmentData, callback, errorCB) {
          //console.log(attachmentData)
          callback()
      }
    }, onEnd)
  }