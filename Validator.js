(function ($) {

    var iconTemplate = '<span class="glyphicon glyphicon-remove form-control-feedback hidden" aria-hidden="true"></span>';


    var _isNotEmpty = function (toAssess) {
        return toAssess.length > 0;
    }
    var _containsNumbersLettersOnly = function (toAssess) {
        var pattern = /^[A-Za-z0-9]*$/;
        return pattern.test(toAssess);
    }

    var _containsNumbersLettersSpacesOnly = function (toAssess) {
        var pattern = /^[A-Za-z0-9\s]*$/;
        return pattern.test(toAssess);
    }

    var _containsNumbersSpacesOnly = function (toAssess) {
        var pattern = /^[0-9\s]*$/;
        return pattern.test(toAssess);
    }

    var _isNotNoneDropdown = function (toAssess) {
        return toAssess !== "--None--";
    }

    var _isValidText = function (toAssess) {
        return _isNotEmpty(toAssess);
    }

    var _isValidEmail = function (toAssess) {
        var emailRegExPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        return (_isNotEmpty(toAssess)) && (emailRegExPattern.test(toAssess));
    }

    var _emailsMatch = function (emailId, toAssess) {
        var emailAddEl = document.getElementById(emailId);
        var emailAdd = "";
        if (emailAddEl) {
            emailAdd = emailAddEl.value;
        }
        return emailAdd === toAssess;
    }

    var _isValidPhone = function (toAssess) {
        return (_isNotEmpty(toAssess)) && (_containsNumbersSpacesOnly(toAssess));
    }

    var _isValidRegNo = function (toAssess) {
        return (_isNotEmpty(toAssess)) && (_containsNumbersLettersSpacesOnly(toAssess)) && (toAssess.length < 9)
    }

    var _isValidVinNo = function (toAssess) {
        var isValid = true;
        if (_isNotEmpty(toAssess)) {
            isValid = _containsNumbersLettersOnly(toAssess);
        }
        return isValid;
    }

    var _isValidDropdown = function (toAssess) {
        return (_isNotEmpty(toAssess)) && (_isNotNoneDropdown(toAssess));
    }

    var _isValidDate = function (toAssess) {
        var isDate = false;

        var dateSplit = toAssess.split("/");
        if (dateSplit.length === 3) {
            var date = new Date(dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0]);
            if (date.toString() !== "Invalid Date") {
                isDate = true;
            }
        }

        return isDate && _isNotEmpty(toAssess);
    }

    var _isValidCurrency = function (toAssess) {
        var validFloat = true;
        var numberVal = parseFloat(toAssess);
        validFloat = !_crossBrowserIsNaN(numberVal);

        return _isNotEmpty(toAssess) && validFloat;
    }

    var _crossBrowserIsNaN = function (number) {
        return number !== number;
    }

    var bindInputErrors = function (input) {
        var validationInfo = input.attr("validate") || "";
        var isRequired = validationInfo.indexOf("required") !== -1;
        var validationType = validationInfo.replace("required","").trim();
        var elementName = input.attr("form-input");
        var parent = input.parent();
        var isValid = true;
        var valueToValidate = input.val();
        var textTemplate = '<span class="help-block hidden">Please enter a valid ' + elementName + '</span>';
        if (parent.hasClass("input-group")) {
            parent = parent.parent();
        }
        var iconElement = parent.find('.form-control-feedback');

        if (isRequired || valueToValidate.length > 0) {
            switch (validationType) {
                case "text":
                    isValid = _isValidText(valueToValidate);
                    break;
                case "dropdown":
                    isValid = _isValidDropdown(valueToValidate);
                    break;
                case "email":
                    isValid = _isValidEmail(valueToValidate);
                    break;
                case "phone":
                    isValid = _isValidPhone(valueToValidate);
                    break;
                case "reg":
                    isValid = _isValidRegNo(valueToValidate);
                    break;
                case "vin":
                    isValid = _isValidVinNo(valueToValidate);
                    break;
                case "date":
                    isValid = _isValidDate(valueToValidate);
                    break;
                case "currency":
                    isValid = _isValidCurrency(valueToValidate);
                    if (isValid) {
                        formatCurrency(input);
                    }
                    break;
                default:
                    break;
            }
        }


        if (iconElement.length === 0) {
            parent.append(iconTemplate);
            parent.append(textTemplate);
        }

        if (!isValid) {
            parent.removeClass("has-success has-feedback");
            parent.addClass("has-error has-feedback");
            parent.find(".glyphicon").addClass("glyphicon-remove");
            parent.find(".glyphicon").removeClass("glyphicon-ok");
            parent.find(".help-block").removeClass("hidden");
        }
        else {
            parent.removeClass("has-error has-feedback");
            parent.addClass("has-success has-feedback");
            parent.find(".glyphicon").removeClass("glyphicon-remove");
            parent.find(".glyphicon").addClass("glyphicon-ok");
            parent.find(".help-block").addClass("hidden");
        }
        parent.find(".glyphicon").removeClass("hidden");
        return isValid;
    }

    var formatCurrency = function (elem) {
        var currentVal = elem.val();
        var newValue = parseFloat(currentVal).toFixed(2);
        elem.val(newValue);
    }

    $.fn.validate = function (options) {
        var _options = $.extend({
            attrName: "validate",
            eventType: "blur",
            autorun: false
        }, options);
        var isAllValid = true;
        if (_options.autorun) {
            this.each(function () {
                if ($(this).attr(_options.attrName)) {
                    var isValidInput = bindInputErrors($(this));
                    if (!isValidInput) {
                        isAllValid = false;
                    }
                }
            });
            return isAllValid;
        }
        else {
            return this.each(function () {
                if ($(this).attr(_options.attrName)) {
                    $(this).off("blur", "**"); //remove blur events so we don't keep adding on postback
                    $(this).on(_options.eventType, function () {
                        bindInputErrors($(this));
                    })
                }

            });
        }

    };
} (jQuery));