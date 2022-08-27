import { DoctorScheduleCalendarComponent } from './doctor-schedule-calendar/doctor-schedule-calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'month/:monthNo', component: DoctorScheduleCalendarComponent },
  { path: '', redirectTo: 'month/'+ (new Date().getMonth() + 1), pathMatch:'full' },
  { path: 'month', redirectTo: 'month/'+ (new Date().getMonth() + 1), pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
