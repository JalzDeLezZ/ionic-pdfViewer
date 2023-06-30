import { Component } from '@angular/core';
import { FileCapService } from '../services/file_cap.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private toastController: ToastController,
    private fileCapService: FileCapService
  ) {}

  async onwriteSecretFile() {
    const res = await this.fileCapService.writeSecretFile('987654321');
    this.presentToast(res[0], res[1], res[2]);
  }
  async onreadSecretFile() {
    const res = await this.fileCapService.readSecretFile('987654321');
    this.presentToast(res[0], res[1], res[2]);
  }
  async ondeleteSecretFile() {
    const res = await this.fileCapService.deleteSecretFile('987654321');
    this.presentToast(res[0], res[1], res[2]);
  }
  async onreadFilePath() {
    const res = await this.fileCapService.readFilePath('987654321');
    this.presentToast(res[0], res[1], res[2]);
  }
  async presentToast(
    position: string,
    message: string,
    color: string = 'dark'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: position as 'top' | 'middle' | 'bottom',
      color,
    });

    await toast.present();
  }
}
