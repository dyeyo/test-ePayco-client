import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  id: string = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
