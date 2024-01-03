import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Firestore, collectionData, collection, } from '@angular/fire/firestore';
import { Flowbite } from '@shared/decortators/flowbite';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(){
  }

  ngOnInit(): void {
    initFlowbite();
    this.hasDarkMode();

  }

  private hasDarkMode() {
    if (localStorage['color-theme'] === 'dark' ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }


}
