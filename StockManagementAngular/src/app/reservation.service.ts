import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Device } from './device/device.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "https://localhost:7081/api/Reservation";

  constructor(private http:HttpClient) { }

  getReservation(){
    return this.http.get<any>(`${this.apiUrl}/viewreservation`);  }


    addReservation(reservationID: string,personName: string, qte: number, devices: Device[] | null , deviceIds : string[]){
      return this.http.post<any>(`${this.apiUrl}/add`, { reservationID,personName, qte, devices , deviceIds})
        .pipe(map(response => {
          return response;
        }));}

      DeleteReservation(reservationID: string) {
        return this.http.delete(`${this.apiUrl}/delete?reservationID=${reservationID}`);
      }


      updateReservation(reservationID: string, personName: string, qte: number, devices:Device[], deviceIds:  string[]) {
        const edit = { reservationID ,personName, qte , devices , deviceIds };
        return this.http.put(`${this.apiUrl}/EditReservation/${reservationID}`, edit);
      }

      editSingleReservation(reservationID: string) {
        return this.http.get<EditReservationComponent>(`${this.apiUrl}/getedit?reservationID=${reservationID}`);
      }


}
