import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Breadcrum } from './model/breadcrum.model';
import { filter, map, mergeMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'at-breadcrum',
  templateUrl: 'breadcrum.atom.html'
})

export class BreadcrumAtom implements OnInit {
  dataBreadcrum: Breadcrum[] = [];
  routeData: any;
  constructor(private router: Router, private route: ActivatedRoute) {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
            if (route.firstChild) {
                route = route.firstChild;
            }

            return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      ).subscribe(data => {
        this.dataBreadcrum = (data?.['breadcrumbs'] as Breadcrum[]) ?? [];
      })
    }

  ngOnInit() {
  }

  goToPath(path: string) {
    this.router.navigate([path])
  }
}
