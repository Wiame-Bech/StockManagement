import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DeviceService } from './device.service';
import { ReservationService } from './reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ReservationComponent,
    HeaderComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    AddReservationComponent,
    EditReservationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DeviceService,
    ReservationService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
