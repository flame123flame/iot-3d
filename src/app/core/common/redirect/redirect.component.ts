import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (true) {
      this.router.navigate(['/exception/404']);
    } else {
      this.router.navigate(['/404']);
    }
  }
}
