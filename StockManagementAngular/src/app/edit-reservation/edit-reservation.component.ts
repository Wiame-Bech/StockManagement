import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { DeviceService } from '../device.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Device } from '../device/device.component';
import { first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.css'
})
export class EditReservationComponent implements OnInit {
  angForm: FormGroup;
  Devices: Device[] = [];
  DeviceNotReserved : Device[]= [];
  reservationID!: string;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private deviceService: DeviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditReservationComponent>
  ) {
    this.angForm = this.fb.group({
      personName: ['', Validators.required],
      qte: ['', Validators.required],
      deviceIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.reservationID = this.data.reservationID;
    console.log('ReservationID:', this.reservationID);
    if (!this.reservationID) {
      console.error('ReservationID is null or undefined!');
      return;
    }

    this.deviceService.getDevice().subscribe((response: any) => {
      this.Devices = response.$values || response;
      this.DeviceNotReserved = this.Devices.filter(device => !device.reservationID);
      console.log(`Devices not reserved :` , this.DeviceNotReserved);
    });

    this.reservationService.editSingleReservation(this.reservationID).subscribe(
      (reservation: any) => {
        console.log('Fetched reservation:', reservation);

        this.angForm.patchValue({
          personName: reservation.personName,
          qte: reservation.qte,
          deviceIds: reservation.deviceIds 
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching reservation:', error);
      }
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  postReservation() {
    const formValue = this.angForm.value;
    const personName = formValue.personName;
    const qte = formValue.qte;
    const deviceIds = Array.isArray(formValue.deviceIds) ? formValue.deviceIds : [formValue.deviceIds];

    const devices = this.Devices.filter(device => deviceIds.includes(device.id));

    const payload = {
      reservationID: this.reservationID,
      personName,
      qte,
      devices,
      deviceIds
    };

    console.log('Payload:', payload);

    this.reservationService.updateReservation(this.reservationID, personName, qte, devices, deviceIds)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Reservation updated successfully:', data);
          this.dialogRef.close();
        this.angForm.reset();
        location.reload();
        },
        (error: HttpErrorResponse) => {
          console.error('Reservation update failed:', error);
        }
      );
  }

  get personName() { return this.angForm.get('personName'); }
  get qte() { return this.angForm.get('qte'); }
  get deviceIds() { return this.angForm.get('deviceIds'); }
}
