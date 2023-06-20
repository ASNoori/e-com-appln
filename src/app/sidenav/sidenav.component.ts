import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  // @Input() sideNavStatus: boolean = false;
  list=[
    {
      number:'1',
      name:'catetgory',
      icon:'fa-solid fa-house',
      link: '/category',
    },
    {
      number:'2',
      name:'subcategory',
      icon:'fa-solid fa-list',
      link: '/subcategory',
    },
    {
      number:'3',
      name:'brand',
      icon:'fa-solid fa-snowflake',
      link: '/brand',
    },
    {
      number:'4',
      name:'product',
      icon:'fa-solid fa-box',
      link: '/product',
    }

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
