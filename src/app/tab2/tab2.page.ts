import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast } from '@capacitor/toast';
import { Clipboard } from '@capacitor/clipboard';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  icon_verify__one: any = null;
  temp: any;
  @ViewChild('myForm') myForm: NgForm;
  @ViewChild('myForm2') myForm2: NgForm;
  @ViewChild('grpInputs_s21') grpInputs_s21: ElementRef;
  @ViewChild('grpInputs_one') grpInputs_one: any;

  constructor(private el: ElementRef, private domCtrl: DomController) {}

  async showHelloToast(sms: string) {
    await Toast.show({
      text: sms,
      duration: 'long',
      position: 'bottom',
    });
  }

  OnlyNumbersAllowed(event: any) {
    const regex = /\d+/g;
    return {
      flag: regex.test(event.key.toString()),
      value: event.key,
    };
  }

  onSubmit(form: NgForm) {
    const form1_values = Object.values(form.value).join('');

    const regex = /^\d{6}$/g;
    const ion_inputs = Array.from(this.grpInputs_one.nativeElement.children);

    if (regex.test(form1_values)) {
      this.domCtrl.write(() => {
        ion_inputs.forEach((item: any, index: number) => {
          item.style.setProperty('border-color', 'green');
        });
      });
    } else {
      this.domCtrl.write(() => {
        ion_inputs.forEach((item: any, index: number) => {
          item.style.setProperty('border-color', 'red');
        });
      });
    }
    this.showHelloToast(form1_values);
  }

  onKeyup(next: any, previous: any, event: any) {
    const verify = this.OnlyNumbersAllowed(event);

    try {
      if (verify.flag) {
        this.el.nativeElement.querySelector('#' + next).setFocus();
      } else if (!verify.flag && verify.value === 'Backspace') {
        this.el.nativeElement.querySelector('#' + previous).setFocus();
      }
    } catch (error) {}
  }

  onKeyup2(next: any, previous: any, event: any) {
    try {
      if (event.key.toString().toUpperCase() === 'BACKSPACE') {
        this.el.nativeElement.querySelector('#' + previous).setFocus();
      } else {
        this.el.nativeElement.querySelector('#' + next).setFocus();
      }
    } catch (error) {}
  }

  onSubmit2(form: NgForm) {
    this.temp = Object.values(form.value).join('');

    const regex = /^\d{4}$/g;
    if (regex.test(this.temp)) {
      this.icon_verify__one = true;
    } else {
      this.icon_verify__one = false;
    }
    this.showHelloToast(this.temp);
  }
  async onPaste() {
    const { value } = await Clipboard.read();

    this.myForm.reset();
    const current_value = value.match(/\d+/g)?.join('')?.slice(0, 6)!;

    current_value.split('').forEach((item, index) => {
      this.grpInputs_one.nativeElement.children[index].value = item;
      this.myForm.form.controls[`input${index + 1}`].setValue(item);
    });
  }
}
