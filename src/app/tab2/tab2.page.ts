import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor() {}

  async showHelloToast() {
    await Toast.show({
      text: 'Clicked!',
      duration: 'long',
      position: 'bottom',
    });
  }
}
