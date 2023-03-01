import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import {
  BarcodeScanner,
  SupportedFormat,
} from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit, OnDestroy {
  decode: any = null;
  scanActive = false;
  status: string = 'primary';

  constructor(private alertC: AlertController) {}

  async ngAfterViewInit() {
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    this.stopScan();
  }

  ionViewWillLeave() {
    this.stopScan();
  }

  async startScan() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan({
        targetedFormats: [SupportedFormat.PDF_417],
      });
      if (result.hasContent) {
        console.log({ decode: this.decode });
        this.decode = this.get_data_json(result.content?.toString() || '');

        this.scanActive = false;
        this.status = 'primary';
      }
    }
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        this.status = 'success';
        resolve(true);
      } else if (status.denied) {
        this.status = 'warning';
        const alert = await this.alertC.create({
          header: 'Permission denied',
          message: 'Please allow camera access in your settings',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
            },
            {
              text: 'Open Settings',
              handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
              },
            },
          ],
        });
        await alert.present();
      } else {
        this.status = 'danger';
        resolve(false);
      }
    });
  }

  stopScan() {
    BarcodeScanner.stopScan();
    this.status = 'primary';
    this.scanActive = false;
  }

  get_data_json(code: string) {
    if (
      code.split('<RE>')[1] == undefined ||
      code.split('<FE>')[1] == undefined ||
      code.split('<MNT>')[1] == undefined ||
      code.split('<F>')[1] == undefined
    ) {
      return 'No se pudo desifrar el codigo, intente nuevamente o registre de manera manual';
    }
    let rut = code.split('<RE>')[1].split('</RE>')[0];
    let fecha = code.split('<FE>')[1].split('</FE>')[0];
    let monto = code.split('<MNT>')[1].split('</MNT>')[0];
    let folio = code.split('<F>')[1].split('</F>')[0];
    return {
      rut: rut,
      fecha: fecha,
      monto: monto,
      folio: folio,
    };
  }
  /*
  URL donde consultar,
  Logo,
  Nombre de la Empresa,
  */
 /*
 1ro las empresas que se pueden escanear
 Definir la estructura, que recibira
 */
}

const config={
  siteKey: "6Ler1BkTAAAAALt-Yf2oAGGvm53sWdp3gt33g2f3",
  pageurl: "http://cencosud.paperless.cl/BoletaJumbo/",
  apiKey:"a8d110e46a19befe296ef4f887813bd2",
  apiSubmitUrl: "http://2captcha.com/in.php",
  apiRetrieveUrl:"http://2captcha.com/res.php"
};

const chromeOptions = {
  //executablePath:"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless:true,
  slowMo:10,
  defaultViewport:null
};
