import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  isSidenavVisible: boolean = true; // Keep for backward compatibility
  isSidebarCollapsed: boolean = false;
  activeCategory: string = 'kindergarten';
  isMobile: boolean = false;

  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }

  ngOnInit(): void {
    this.checkMobile();
    this.setActiveCategoryFromRoute();
    
    // Listen to router events to update active category
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveCategoryFromRoute();
      }
    });
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  private setActiveCategoryFromRoute(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/kindergarten')) {
      this.activeCategory = 'kindergarten';
    } else if (currentUrl.includes('/bibles')) {
      this.activeCategory = 'bibles';
    } else if (currentUrl.includes('/story-books')) {
      this.activeCategory = 'story-books';
    } else {
      this.activeCategory = 'kindergarten'; // Default
    }
  }

  toggleSidenav(): void {
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebarOnMobile(): void {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  navigateToCategory(category: string): void {
    this.activeCategory = category;
    this.router.navigate(['/shop', category]);
    this.closeSidebarOnMobile();
  }
}
