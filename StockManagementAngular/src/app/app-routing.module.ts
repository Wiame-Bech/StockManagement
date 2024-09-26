import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HeaderComponent } from './header/header.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';



const routes: Routes = [
  { path: 'Device', component: DeviceComponent },
  { path : 'Reservation', component: ReservationComponent},
  { path : 'header' , component : HeaderComponent},
  { path : 'add_device' , component : AddDeviceComponent},
  { path : 'editdevice/:id' , component : EditDeviceComponent },
  { path : 'add_reservation' , component :AddReservationComponent },
  { path: 'edit-reservation/:reservationID', component: EditReservationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
