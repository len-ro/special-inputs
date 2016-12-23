# special-inputs

## Context

[Aurelia](http://www.aurelia.io) and the [Kendo bridge](https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge)
offer a nice way to start a web application with a rich interface. The question any rich interface developer
will have to answer sooner or later is how to add functionality to the "out of the box" components.

# Use-case

A simple use case would be to be able to extend the [NumericTextBox](http://aurelia-ui-toolkits.github.io/demo-kendo/#/samples/numerictextbox-basic-usage), which by
default has the input restricted to [0-9.]+ to accept additional modifiers such as k, m.

These are common to financial applications for better control: 1k => 1000, 1m => 1000000.

# First method

The first approach on [extending](http://docs.telerik.com/kendo-ui/intro/widget-basics/create-custom-kendo-widget) 
the NumericTextBox is to follow official doc and just create an extended component (in an OOP thinking).

- first you extend the NumericTextBox. See: src/vanilla/kendo-number-input.js
- the you wrap it in Aurelia. See: src/components/oop-way/number-input.ts

The disadvantage of this approach is that you loose all the wrapping provided by the bridge
and you will have to re-wrap everything yourself (bind to events, wrap properties, etc.).

# Second method

I have spent a lot of years codding in C++ and Java so I have a certain mind structure.
In that context the first method seems fine to me. However this is JavaScript and the language
is flexible enough for a better way.

Just access the NumbericTextBox via the k-widget (available in the next tick after attached) and
**modify the desired function**! 

Just that easy. In the process keep all the wrapping and limit the code required. See: src/components/number-input.ts.