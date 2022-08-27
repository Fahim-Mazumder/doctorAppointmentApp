export class Appointment {
  firstName: String;
  lastName: String;
  email: String;
  gender: String;
  age: number;
  date: Date;
  time: string;
  timeint: number = 0;

  constructor() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.gender = '';
      this.age = 0;
      this.date = new Date();
      this.time = new Date().getTime.toString();
  }

  getTimeInt(): number {
    let val = this.time.replace(':', '');
    return parseInt(val);
  }
}
