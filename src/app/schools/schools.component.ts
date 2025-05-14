import { Component } from '@angular/core';

@Component({
  selector: 'app-schools',
  imports: [],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent {
  downloadCatalog(type: 'national' | 'international'): void {
    const link = document.createElement('a');
    if (type === 'national') {
      link.href = '/assets/docs/school-catalog.pdf';
      link.download = 'school-catalog.pdf';
    } else {
      link.href = '/assets/docs/int-school-catalog.pdf';
      link.download = 'int-school-catalog.pdf';
    }
    link.click();
  }
}
