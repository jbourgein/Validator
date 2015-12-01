# Validator
jQuery and Bootstrap validation

## Dependecies
* jQuery (tested 1.11.3)
* Boostrap (tested 3.3.5)

## How to use it
Add `validate` attribute to input with value of one of the following
* text
* dropdown
* email
* phone
* reg
* vin
* date
* currency

It will only validate if there is a value to validate.

To mark an input as required add `"required"` to the validate attribute. 

Add `form-input` to attribute to input and that will be used in the text that displays under the warning e.g. `form-input="start date"` will produce the text "please enter a valid start date".

## Options
* `attrName` - what attribute name to look for. Defaults to "validate"
* `eventType` - what event to bind the validation to. Defaults to "blur"
* `autorun` - whether to validate without an event (you might to use this on form submit). Defaults to false

## Example
```
<div class="form-group">
    <label for="RegistrationNumberTextBox">Registration No</label>
    <input type="text" ID="RegistrationNumberTextBox" class="form-control" validate="reg requried" form-input="registration number" placeholder="Reg No"></input>
</div>
```
```
$(document).ready(function(){
    $('#RegistrationNumberTextBox').validate();
});
```