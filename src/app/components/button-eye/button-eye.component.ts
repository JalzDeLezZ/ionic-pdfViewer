import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-eye',
  templateUrl: './button-eye.component.html',
  styleUrls: ['./button-eye.component.scss'],
})
export class ButtonEyeComponent {
  icon_eye: 'eye-outline' | 'eye-off-outline' = 'eye-outline';
  @Input() input_content: any;
  @Input() type: 'focus' | 'container' = 'container';

  constructor() {}
  onShowPasswordToggle() {
    if (this.type === 'container') {
      const inputs = Array.from(this.input_content.children);
      let typeInput;
      inputs.forEach((input: any) => {
        typeInput =
          input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', typeInput);
      });

      this.icon_eye =
        typeInput === 'password' ? 'eye-outline' : 'eye-off-outline';
    } else if (this.type === 'focus') {
      const typeInput =
        this.input_content.type === 'password' ? 'text' : 'password';
      this.input_content.type = typeInput;
      this.icon_eye =
        typeInput === 'password' ? 'eye-outline' : 'eye-off-outline';
    }
  }
}
