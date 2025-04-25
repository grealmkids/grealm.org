import { Component } from '@angular/core';

@Component({
  selector: 'app-businesses',
  imports: [],
  templateUrl: './businesses.component.html',
  styleUrl: './businesses.component.css'
})
export class BusinessesComponent {
  downloadCatalog(): void {
    const link = document.createElement('a');
    link.href = '/assets/docs/business-services.pdf';
    link.download = 'business-services.pdf';
    link.click();
  }
}
