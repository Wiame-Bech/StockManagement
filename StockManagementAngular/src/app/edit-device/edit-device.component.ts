import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../device.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { first } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css']
})
export class EditDeviceComponent implements OnInit {
  angForm: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private DeviceService: DeviceService,
    private router: Router,
    private dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.angForm = this.fb.group({
      id : [],
      name: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      reservationId: [null],
      reservation: [null]
    });
  }

  ngOnInit(): void {
    this.id = this.data.id;
    console.log('id:', this.id);
    if (!this.id) {
      console.error('id is null or undefined!');
      return;
    }

    this.DeviceService.editSingleDevice(this.id).subscribe(
      (device: any) => {
        this.angForm.patchValue({
          name: device.name,
          numeroSerie: device.numeroSerie
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching device:', error);
      }
    );
  }
  onSave(): void {
    if (this.angForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formValue = this.angForm.value;

    this.DeviceService.EditDevice(
      this.id,
      formValue.name,
      formValue.numeroSerie,
      formValue.reservationId || null,
      formValue.reservation || null
    )
    .pipe(first())
    .subscribe(
      data => {
        console.log('Device updated successfully:', data);
        this.dialogRef.close();
        this.angForm.reset();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to update device:', error);
      }
    );
  }



  onClose(): void {
    this.dialogRef.close();
  }
}
