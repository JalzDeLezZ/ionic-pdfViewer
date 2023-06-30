import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController, NavParams, ToastController } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileService } from '../../services/file.service';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [PdfViewerModule, IonicModule],
})
export class ModalComponent implements OnInit {
  @Input() pdfSrc: String =
    'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  zoom = 1;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private fileService: FileService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  subtratZoom() {
    if (this.zoom > 0.5) {
      this.zoom -= 0.3;
    }
  }
  addZoom() {
    if (this.zoom < 2) {
      this.zoom += 0.3;
    }
  }

  onDowload() {
    try {
      this.fileService.downloadFile(this.pdfSrc, 'test');
      this.presentToast('bottom', 'Downloaded' , 'success');
    } catch (error) {
      this.presentToast('bottom', `Error: ${error}`, 'danger');
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      color,
    });

    await toast.present();
  }

}
