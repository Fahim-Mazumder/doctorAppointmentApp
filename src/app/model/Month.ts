export class Month {
  serial: number;
  name: String;

  constructor(s: number, n: String) {
      this.serial = s;
      this.name = n;
  }

  getAllMonths(currentYear: any, currentDate: any): Month[] {
    let months: Month[] = [];

    for (let i = 0; i <= 11; i++) {
      let date = new Date(currentYear, i, currentDate);
      let shortMonth = date.toLocaleString('en-us', { month: 'long' });
      months.push(new Month(i + 1, shortMonth));
    }

    return months;
  }
}
