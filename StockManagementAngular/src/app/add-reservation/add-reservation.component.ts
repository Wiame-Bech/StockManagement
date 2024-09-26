import { AfterViewInit, Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { DeviceService } from '../device.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Device } from '../device/device.component';
import { first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';


@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.css'
})
export class AddReservationComponent implements OnInit , AfterViewInit {
  angForm: FormGroup;
  Devices: Device[] = [];
  DeviceNotReserved : Device[]= [];
  Alert : boolean = false ;

  constructor(
    private fb: FormBuilder,
    private ReservationService: ReservationService,
    private DeviceService: DeviceService,
    private dialogRef: MatDialogRef<AddReservationComponent>
  ) {
    this.angForm = this.fb.group({
      personName: ['', Validators.required],
      qte: ['', Validators.required],
      deviceIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.DeviceService.getDevice().subscribe((response: any) => {
      this.Devices = response.$values || response;
      console.log(`Devices :` , this.Devices);

      this.DeviceNotReserved = this.Devices.filter(device => !device.reservationID);
      console.log(`Devices not reserved :` , this.DeviceNotReserved);

    });
  }

  ngAfterViewInit(): void {
    ($('.selectpicker') as any).selectpicker();
  }


  onClose(): void {
    this.dialogRef.close();
  }

  postReservation() {
    if (this.angForm.invalid) {
      return;
    }
    const formValue = this.angForm.value;
    const reservationID = uuidv4();
    const personName = formValue.personName;
    const qte = formValue.qte;
    const deviceIds = Array.isArray(formValue.deviceIds) ? formValue.deviceIds : [formValue.deviceIds];

    const devices = this.Devices.filter(device => deviceIds.includes(device.id));

    const payload = {
      reservationID,
      personName,
      qte,
      devices,
      deviceIds
    };

    console.log('Payload:', payload);

    this.ReservationService.addReservation(reservationID, personName, qte, devices, deviceIds)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Reservation successful:', data);
          this.angForm.reset();
          location.reload();
          this.Alert = true;
          setTimeout(() => {
            this.Alert = false;
          }, 3000);
        },
        (error: HttpErrorResponse) => {
          console.error('Reservation failed:', error);
        }
      );
  }

  get personName() { return this.angForm.get('personName'); }
  get qte() { return this.angForm.get('qte'); }
  get deviceIds() { return this.angForm.get('deviceIds'); }
}
