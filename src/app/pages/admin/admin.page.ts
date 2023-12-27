import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  pathActive: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login'])
  }

  navigateTo(path: string) {
    this.router.navigate([path])
  }
}
