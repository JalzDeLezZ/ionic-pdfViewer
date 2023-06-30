import { Component, OnInit, Input } from '@angular/core';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';

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

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  onDowload() {}
}
