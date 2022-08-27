import { Appointment } from "./Appointment";

export class Day {
  dayNo: number;
  appointments: Appointment[];

  constructor(d: number, a: Appointment[]) {
    this.dayNo = d;
    this.appointments = a;
  }
}
