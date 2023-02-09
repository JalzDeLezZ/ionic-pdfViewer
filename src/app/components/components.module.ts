import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonEyeComponent } from './button-eye/button-eye.component';
import { IconVerifyComponent } from './icon-verify/icon-verify.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [ButtonEyeComponent, IconVerifyComponent],
  exports: [ButtonEyeComponent, IconVerifyComponent],
})
export class ComponentsModule {}
