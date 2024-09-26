import { Component, OnInit } from '@angular/core';
import { Reservation, ReservationComponent } from '../reservation/reservation.component';
import { FormBuilder } from '@angular/forms';
import { DeviceService } from '../device.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceComponent } from '../add-device/add-device.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDeviceComponent } from '../edit-device/edit-device.component';


export interface Device {
  id: string;
  name: string;
  numeroSerie: number;
  reservationID: string | null;
  reservation: Reservation | null;
}

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {
  id!: string;
  name: string = "";
  numeroSerie!: number;
  reservationID!: number | null;
  reservation!: Reservation | null;
  Devices: any;

  constructor(private fb: FormBuilder,private DeviceService: DeviceService,private router:Router , private DialogRef : MatDialog ){}

  delete(id: any) {
    console.log(id);
    this.DeviceService.DeleteDevice(id).subscribe(
      data => {
        console.log(id);
        location.reload();
      },
      error => {
        if (error.status === 200) {
          console.error('Error deleting device:', error);
          alert('Error deleting device: ' + error.message);
        } else {
          console.error('Error deleting device:', error);
        }
      }
    );
  }

  openDialog() {
    this.DialogRef.open(AddDeviceComponent, {
      width: '500px',
      data: { }
    });

  }

  PopUp(id: any) {
    console.log('Device ID being passed:', id);  // Add this line to check if ID is valid
    this.DialogRef.open(EditDeviceComponent, {
      width: '500px',
      data: { id: id }
    });

  }

  ngOnInit(): void {
    this.DeviceService.getDevice().subscribe(
      (data: any) => {
        console.log(data);
        this.Devices = data.$values;
      },
      (error) => {
        console.error('Error fetching devices', error);
      }
    );  }


    setInitialValues(id: string, name: string, numeroSerie: number, reservationID: number | null, reservation: Reservation | null): void {
      this.id = id;
      this.name = name;
      this.numeroSerie = numeroSerie;
      this.reservationID = reservationID;
      this.reservation = reservation;
    }
}
