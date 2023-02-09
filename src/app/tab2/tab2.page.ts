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
    console.log(
      '🚀 ~ file: tab2.page.ts:39 ~ Tab2Page ~ onSubmit ~ form1_values',
      form1_values
    );
    const regex = /^\d{6}$/g;
    const ion_inputs = Array.from(this.grpInputs_one.nativeElement.children);
    console.log("🚀 ~ file: tab2.page.ts:46 ~ Tab2Page ~ onSubmit ~ ion_inputs", ion_inputs)
    if (regex.test(form1_values)) {
      this.domCtrl.write(() => {
        ion_inputs.forEach((item: any, index: number) => {
          item.style.setProperty('border-color','green')
        });
      });
    } else {
      this.domCtrl.write(() => {
        ion_inputs.forEach((item: any, index: number) => {
          item.style.setProperty('border-color','red')
        });
      });
    }
    this.showHelloToast(form1_values);
  }

  onKeyup(next: any, previous: any, event: any) {
    const verify = this.OnlyNumbersAllowed(event);
    console.log(
      '🚀 ~ file: tab2.page.ts:45 ~ Tab2Page ~ onKeyup ~ verify',
      verify
    );
    try {
      if (verify.flag) {
        // event.target.value = '';
        // this.myForm.form.controls[event.target.name].setValue('');
        this.el.nativeElement.querySelector('#' + next).setFocus();
      } else if (!verify.flag && verify.value === 'Backspace') {
        // event.target.value = event.target.value;
        // this.myForm.form.controls[event.target.name].setValue(  event.target.value);
        this.el.nativeElement.querySelector('#' + previous).setFocus();
      }
    } catch (error) {}
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  onKeyup2(next: any, previous: any, event: any) {
    try {
      if (event.key.toString().toUpperCase() === 'BACKSPACE') {
        // event.target.value = event.target.value;
        // this.myForm2.form.controls[event.target.name].setValue(
        //   event.target.value
        // );
        this.el.nativeElement.querySelector('#' + previous).setFocus();
      } else {
        // event.target.value = '';
        // this.myForm2.form.controls[event.target.name].setValue('');
        this.el.nativeElement.querySelector('#' + next).setFocus();
      }
    } catch (error) {}
  }

  onSubmit2(form: NgForm) {
    this.temp = Object.values(form.value).join('');
    console.log(
      '🚀 ~ file: tab2.page.ts:84 ~ Tab2Page ~ onSubmit2 ~ this.temp',
      this.temp
    );
    const regex = /^\d{4}$/g;
    if (regex.test(this.temp)) {
      this.icon_verify__one = true; //'checkmark-circle-outline';
    } else {
      this.icon_verify__one = false; //'close-circle-outline';
    }
    this.showHelloToast(this.temp);
  }
  async onPaste() {
    const { value } = await Clipboard.read();
    // const value = '777777777'
    this.myForm.reset();
    const current_value = value.match(/\d+/g)?.join('')?.slice(0, 6)!;

    current_value.split('').forEach((item, index) => {
      this.grpInputs_one.nativeElement.children[index].value = item;
      this.myForm.form.controls[`input${index + 1}`].setValue(item);
    });
    /*
    const HTML_section = Array.from(this.grpInputs_one.nativeElement.children);

    HTML_section.forEach((item: any, index: any) => {
      this.grpInputs_one.nativeElement.children[index].value = item;
      this.myForm.form.controls[`input${index + 1}`].setValue(item);
    }); */

    // i wanto to manipulate the children elements of the tag_section html element

    // tag_section.children.forEach((item: any, index: any) => {
    //   this.myForm.form.controls[`input${index + 1}`].setValue(item);
    // });

    // current_value.split('').forEach((item, index) => {
    //   this.grpInputs_one.el.children[index].value = item;
    //   this.myForm.form.controls[`input${index + 1}`].setValue(item);
    // });
  }
}
