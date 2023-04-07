import { Injectable } from '@angular/core';
import cryptoRandomString from 'crypto-random-string';

export enum AlertType {
  SUCCESS = 'bg-color-success',
  ERROR = 'bg-color-error'
}

export enum AlertIconStyle {
  SUCCESS = 'bi-check-circle-fill text-success',
  ERROR = 'bi-x-circle-fill text-danger'
}

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
  iconStyle: AlertIconStyle;
  autohide: boolean,

}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts: Alert[] = [];


  constructor() {

  }

  show(Alert: Alert) {
    if(this.alerts.length>0){
      this.remove(this.alerts[0])
    }
    this.alerts = [...this.alerts, Alert];
  }


  remove(alert: Alert) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }

  success(message: string) {
    this.show({
      id: this.createId(),
      message: message,
      type: AlertType.SUCCESS,
      iconStyle: AlertIconStyle.SUCCESS,
      autohide: true
    });
  }


  error(message: string) {
    this.show({
      id: this.createId(),
      message: message,
      type: AlertType.ERROR,
      iconStyle: AlertIconStyle.ERROR,
      autohide: true
    });
  }


  private createId(): string {
    return cryptoRandomString({ length: 20, type: 'alphanumeric' })
  }

}
