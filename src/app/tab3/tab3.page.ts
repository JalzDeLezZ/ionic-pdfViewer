import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit, OnDestroy {
  result: any = null;
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
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.PDF_417, SupportedFormat.QR_CODE, SupportedFormat.CODE_128] });
      if (result.hasContent) {
        this.result = result.content;
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
}
/*
https://github.com/capacitor-community/barcode-scanner/
https://youtu.be/8GXfjDUCYjU
How to Build an Ionic Barcode Scanner with Capacitor

*/

/*
async startScan() {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      this.decode = result.content || ''; // set the scanned content to the variable
    }
  }
*/

/*
<manifest package="io.ionic.starter" xmlns:tools="http://schemas.android.com/tools" xmlns:android="http://schemas.android.com/apk/res/android">

<uses-permission android:name="android.permission.CAMERA" />
    <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />

*/
