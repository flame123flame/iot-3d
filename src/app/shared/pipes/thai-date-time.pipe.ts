import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';


@Pipe({ name: 'thaiDateTime' })
export class ThaiDateTimePipe implements PipeTransform {
  transform(value: string | Date, format?: 'full' | 'medium' | 'short'): string | null {
    const ThaiDay = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
    const shortThaiMonth = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const longThaiMonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const inputDate = moment(value).toDate();

    if (!moment(inputDate).isValid()) return null;

    const day = inputDate.getDay();
    const date = inputDate.getDate();
    const month = inputDate.getMonth();
    const year = inputDate.getFullYear();
    const thaiYear = year + 543;

    const hours = inputDate.getHours().toString().padStart(2, '0'); // เพิ่มเลข 0 ข้างหน้าเมื่อน้อยกว่า 10
    const minutes = inputDate.getMinutes().toString().padStart(2, '0'); // เพิ่มเลข 0 ข้างหน้าเมื่อน้อยกว่า 10
    const seconds = inputDate.getSeconds().toString().padStart(2, '0'); // เพิ่มเลข 0 ข้างหน้าเมื่อน้อยกว่า 10

    const outputDateFull = [`${date}`, `${longThaiMonth[month]}`, `${thaiYear}`, `เวลา ${hours}:${minutes}:${seconds}`];
    const outputDateShort = [date, shortThaiMonth[month], thaiYear];
    const outputDateMedium = [date, longThaiMonth[month], thaiYear];

    let returnDate = outputDateFull.join(" ");
    if (format == 'full') returnDate = outputDateFull.join(" ");
    if (format == 'medium') returnDate = outputDateMedium.join(" ");
    if (format == 'short') returnDate = outputDateShort.join(" ");
    return returnDate;
  }
}
