import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Reservation } from '../app/reservation/reservation.component';
import { map } from 'rxjs';
import { Device, DeviceComponent } from './device/device.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private apiUrl = "https://localhost:7081/api/Device";

  constructor(private http:HttpClient) { }

   getDevice(){
    return this.http.get<any>(`${this.apiUrl}/view`);  }

   addDevice(name: string,numeroSerie: number, reservationId: string | null, reservation: Reservation | null){
    return this.http.post<any>(`${this.apiUrl}/add`, { name,numeroSerie, reservationId, reservation})
      .pipe(map(response => {
        return response;
      }));
  }
   DeleteDevice(ID : string){
    return this.http.delete(`${this.apiUrl}/deletedevice?ID=${ID}`);
  }

  EditDevice(id: string, name: string, numeroSerie: number, reservationId: string | null, reservation: Reservation | null) {
    const edit = { ID: id, Name: name, NumeroSerie: numeroSerie, ReservationId: reservationId, Reservation: reservation };
    return this.http.put(`${this.apiUrl}/edit/${id}`, edit);
  }


editSingleDevice(id: string) {
  return this.http.get<EditDeviceComponent>(`${this.apiUrl}/get-edit?id=${id}`);
}

}
