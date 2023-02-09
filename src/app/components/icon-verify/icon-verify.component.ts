import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-icon-verify',
  templateUrl: './icon-verify.component.html',
  styleUrls: ['./icon-verify.component.scss'],
})
export class IconVerifyComponent implements OnChanges {
  @Input() icon: boolean | null = null;
  constructor() {}

  ngOnChanges(changes: any): void {
    changes.icon.currentValue;
  }
}
