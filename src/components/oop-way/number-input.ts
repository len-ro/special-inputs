import {bindable} from 'aurelia-framework';

export class NewNumberInput {
    htmlInput = null;

    @bindable
    value;

    attached(){
        $(this.htmlInput).kendoNumberInput().data('kendoNumberInput').first('change',this.onChange);
    }

  onChange = (event) => {

      console.log("new-number-input  OnChange: " + event);
      this.value = event.sender.value();
    }

    valueChanged(newValue, oldValue){
        console.log("new-number-input valueChanged, newValue: " + newValue + " , oldValue: " + oldValue);
        $(this.htmlInput).data('kendoNumberInput').value(newValue);
    }
}