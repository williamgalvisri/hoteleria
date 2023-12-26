import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BreadcrumAtom } from '@shared/components/atoms/breadcrum/breadcrum.atom';

@Component({
  standalone: true,
  selector: 'pg-admin',
  imports: [CommonModule, RouterOutlet, BreadcrumAtom],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css'
})

export class AdminPage implements OnInit {
  isOpenSidebar: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() { }

  logout() {
    this.router.navigate(['/login'])
  }

  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
