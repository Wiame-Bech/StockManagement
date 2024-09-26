import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../device.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css'
})
export class AddDeviceComponent implements OnInit {
  angForm: FormGroup;
  Devices: any[] = [];

  constructor(private fb: FormBuilder,private DeviceService: DeviceService,private router:Router , private dialogRef: MatDialogRef<AddDeviceComponent>) {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      reservationId: [null],
      reservation: [null]

    });}
    ngOnInit(): void {
    }

    onClose(): void {
      this.dialogRef.close();
    }

  postdata(angForm1: FormGroup){
    if (this.angForm.invalid) {
      return; 
    }
    this.DeviceService.addDevice(
      angForm1.value.name,
      angForm1.value.numeroSerie,
      angForm1.value.reservationId || null,
      angForm1.value.reservation || null
    )
  .pipe(first())
  .subscribe(
  data => {
    console.log('successful:', data);
    this.angForm.reset();
    location.reload();
  },
  error => {
    console.error(' failed:', error);
  });
  }

get name() { return this.angForm.get('name'); }
get numeroSerie() { return this.angForm.get('numeroSerie'); }
get reservationId() { return this.angForm.get('reservationId'); }
get reservation() { return this.angForm.get('reservation'); }


}
