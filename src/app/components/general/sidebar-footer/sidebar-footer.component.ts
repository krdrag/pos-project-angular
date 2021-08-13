import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.css']
})
export class SidebarFooterComponent implements OnInit {

  faCircle = faCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
