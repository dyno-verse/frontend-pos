// calculator.ts

export class Calculator {
    private currentValue: number;
    private decimalValues: number;

    constructor() {
        this.currentValue = 0;
        this.decimalValues = 0;
    }

    appendDigit(digit: number): void {
        if (this.currentValue === 0) {
            this.currentValue = digit;
        } else {
            this.currentValue = parseFloat(this.currentValue.toString() + digit.toString());
        }
    }

    appendDecimal(): void {
        if (!this.currentValue.toString().includes('.')) {

            // this.currentValue = parseFloat(this.currentValue.toString() + '.');
        }else{

        }
    }

    clear(): void {
        this.currentValue = 0;
    }

    getCurrentValue(): number {
        return this.currentValue;
    }
}
