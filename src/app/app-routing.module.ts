import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorScheduleCalendarComponent } from './components/doctor-schedule-calendar/doctor-schedule-calendar.component';

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
