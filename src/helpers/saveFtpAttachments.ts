import { EnergySystem } from "../models/EnergySystem";
import fs from "fs";
import {Error} from "sequelize";

export async function saveFtpAttachments(energySystem: EnergySystem, file_date: string) : Promise<string> {
  return new Promise((resolve, reject)=>{
    try {


      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ftpClient = require('ftp');

      const c = new ftpClient();
      c.on('ready', function() {
        console.log("connected to ftp server")
        const generatedFilename = file_date+ '_' + energySystem.inputFilename + '.xlsx';

        c.get(energySystem.ftpInputPath + "/" + file_date+ '_' + energySystem.inputFilename + '.xlsx', function(err: Error, stream: { once: (arg0: string, arg1: () => void) => void; pipe: (arg0: fs.WriteStream) => void; }) {
          try{
            if (err){
              throw err;
            }
            stream.once('close', function() {
              c.end();
              resolve(generatedFilename);
            });
            stream.pipe(fs.createWriteStream('tmp/'+ generatedFilename));
          }
          catch (e: any){
            console.error(e);
            reject();
          }
        });

      });
      const config = {
        host: energySystem.ftpServer,
        port: 21,
        secure: true,
        secureOptions: { "rejectUnauthorized": false},
        user: energySystem.ftpUser,
        password: energySystem.ftpPassword
      }
      c.connect(config);

    } catch {
      reject();
    }
  })
}
