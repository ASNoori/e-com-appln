import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usersidenav',
  templateUrl: './usersidenav.component.html',
  styleUrls: ['./usersidenav.component.css']
})
export class UsersidenavComponent implements OnInit {
  list=[
    {
      number:'1',
      name:'Products',
      icon:'fa-solid fa-box',
      link: '/products',
    },
    {
      number:'2',
      name:'Orders',
      icon:'fa-solid fa-bag-shopping',
      link: '/orders',
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
