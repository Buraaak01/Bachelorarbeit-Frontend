import { Component } from '@angular/core';
import { AlertService } from "../../service/util/alert.service";

@Component({
  selector: 'app-alert-container',
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.component.css']
})
export class AlertContainerComponent {

  constructor(public alertService: AlertService) {

  }

}
