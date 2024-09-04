import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',

  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() countNumber: number = 0;
  @Input() countType: string = "";
}
