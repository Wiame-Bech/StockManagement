import { Component, OnInit } from '@angular/core';
import { Device, DeviceComponent } from '../device/device.component';
import { FormBuilder } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { MatDialog } from '@angular/material/dialog';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';

export interface Reservation {
  reservationID: string;
  personName: string;
  qte: number;
  devices: Device[];
  deviceIds: string[];
}
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {
  reservationID: string | undefined;
  personName: string ="";
  qte!: number;
  Devices!: { $values: Device[]; };
  Reservations: any;


  constructor(private fb: FormBuilder,private ReservationService: ReservationService,private router:Router , private DialogRef : MatDialog ){}

  delete(reservationID: string) {
    if (!reservationID) {
      console.error('ReservationID is undefined or invalid');
      return;
    }

    this.ReservationService.DeleteReservation(reservationID).subscribe(
      () => {
        console.log(`Reservation with ID: ${reservationID} deleted successfully`);
        location.reload();
      },
      error => {
        console.error('Error deleting reservation:', error);
        alert('Error deleting reservation: ' + error.message);
      }
    );
  }

  PopUp() {
    this.DialogRef.open(AddReservationComponent, {
      width: '500px',
      data: { }
    });
  }

  Edit(reservationID : string) {
    this.DialogRef.open(EditReservationComponent, {
      width: '500px',
      data: { reservationID }
    });
  }

  ngOnInit(): void {
    this.ReservationService.getReservation().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.Reservations = data.$values.map((reservation: any) => ({
          reservationID: reservation.reservationID,
          personName: reservation.personName,
          qte: reservation.qte,
          devices: reservation.devices.$values || []

        }));
        console.log('Processed Reservations:', this.Reservations);

      },
      (error) => {
        console.error('Error fetching Reservations:', error);
      }
    );
  }

    setInitialValues(reservationID: string, personName: string, qte: number, Devices: { $values: Device[]; } ): void {
      this.reservationID = reservationID;
      this.personName = personName;
      this.qte = qte;
      this.Devices = Devices;
    }
}
