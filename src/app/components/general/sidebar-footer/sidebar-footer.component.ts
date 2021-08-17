import { Component, OnInit } from '@angular/core';
import { faCircle, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/general/user.service';
import { WorkstationService } from 'src/app/services/general/workstation.service';
import { User } from '../../../models/user.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.css']
})
export class SidebarFooterComponent implements OnInit {

  faCircle = faCircle;
  faUserAlt= faUserAlt;
  user: User;
  workstation;

  constructor(
    private translate: TranslateService, 
    private userService: UserService,
    private WorkstationService: WorkstationService) { }

  ngOnInit(): void {
    this.user = this.userService.GetUser();
    this.workstation = this.WorkstationService.getWorkstationData();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

}
