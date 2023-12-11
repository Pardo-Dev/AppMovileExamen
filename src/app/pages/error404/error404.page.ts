import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  apodData: any;

  constructor(private apodService : ApiService) { }

  ngOnInit() {
    this.apodService.getApod().subscribe((data) => {
      this.apodData = data;
    })
  }

}
