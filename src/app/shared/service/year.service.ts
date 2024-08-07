import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class YearService {
    constructor() { }

    getYears(): number[] {
        const years: number[] = [];
        const currentYear = new Date().getFullYear();
        for (let i = 0; i <= 10; i++) {
            years.push(currentYear - i);
        }
        years.unshift(currentYear + 1); // Add next year at the beginning
        return years;
    }
}
