import { autoinject, bindable, TaskQueue, computedFrom } from 'aurelia-framework';
import { Util } from 'common/util';

@autoinject
export class NumberInput {
    @bindable value: any = null;
    @bindable minValue: number = 0;
    @bindable maxValue: number = null;
    @bindable precision: number = 2;
    @bindable spinners: boolean = false;
    @bindable readonly: boolean = false;
    numericTextBox = null;

    constructor(private element: Element, private taskQueue: TaskQueue) { }

    _keypress(e) {
        //do nothing override the default

        var character = String.fromCharCode(e.which);
        console.log("kendo-number-input _keypress character: " + character);

        //todo
        //restrict="0-9kKmM\-.,"
        //\-.,
        //precision
        //set value ->  value
        //enabled?
        //minValue -> min
        //maxValue -> max

        let that = this;
        let element = that.element;

        let multiplier = 0;
        if (character.toLowerCase() === 'k') {
            multiplier = 1000;
        }

        if (character.toLowerCase() === 'm') {
            multiplier = 1000000;
        }

        if (multiplier !== 0) {
            var value = element.val();
            var nvalue = parseInt(value) * multiplier;
            element.val(nvalue);
            e.preventDefault();
            return;
        }

        if ("01234567890-.,".indexOf(character) !== -1) {
            console.log("===calling super keypress");
            that._orig_keypress.call(that, e);
        } else {
            console.log("===character " + character + " is ignored ");
            e.preventDefault();
            return;
        }
    }

    attached() {
        this.taskQueue.queueTask(() => {
            this.numericTextBox._orig_keypress = this.numericTextBox._keypress;
            this.numericTextBox._keypress = this._keypress;
        });
    }

    @computedFrom('precision')
    get step(): number {
        return Math.pow(10, - this.precision);
    }

    @computedFrom('precision')
    get format(): string {
        return "n" + this.precision;
    }

    onChange(event) {
        event.stopPropagation();
        this.taskQueue.queueMicroTask(() => this.dispatch());
    }

    dispatch() {
        Util.dispatchCustomEvent(this.element, "k-on-change", { value: this.value });
    }

    //https://www.len.ro/work/update-numerictextbox-precision-on-the-fly/ && https://gist.run/?id=295a3a3b31f022fac38de34ba7912bc2
    precisionChanged(newValue, oldValue) {
        if (this.numericTextBox) {
            let step = Math.pow(10, - this.precision);
            this.numericTextBox.setOptions({ format: 'n' + newValue, decimals: newValue, step: step });
            this.numericTextBox.value(this.value);
        }
    }
}
