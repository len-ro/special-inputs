$(function() {

    // wrap the widget in a closure. Not necessary in doc ready, but a good practice
    (function($) {

        // shorten references to variables. this is better for uglification 
        var kendo = window.kendo,
            ui = kendo.ui,
            NumericTextBox = ui.NumericTextBox;

        // create a new widget which extends the first custom widget
        var NumberInput = NumericTextBox.extend({

            // every widget has an init function
            init: function(element, options) {
                var that = this;
                NumericTextBox.fn.init.call(that, element, options);

            },

            _keypress: function(e) {
                var character = String.fromCharCode(e.which);
                
                //todo
               	//restrict="0-9kKmM\-.,"
                //\-.,
                //precision
                //set value ->  value
                //enabled?
                //minValue -> min
                //maxValue -> max


                var that = this;
                var element = that.element;

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
                    //calling super keypress
                    NumericTextBox.fn._keypress.call(that, e);
                } else {
                    console.log("character " + character + " is ignored ");
                    e.preventDefault();
                    return;
                }
            },

            options: {
                name: "NumberInput"
            }
        });

        // add this new widget to the UI namespace.
        ui.plugin(NumberInput);

    })(jQuery);
});