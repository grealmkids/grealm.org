import { Component } from '@angular/core';

@Component({
  selector: 'app-schools',
  imports: [],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent {
  downloadCatalog(): void {
    const link = document.createElement('a');
    link.href = '/assets/docs/school-catalog.pdf';
    link.download = 'school-catalog.pdf';
    link.click();
  }
}
