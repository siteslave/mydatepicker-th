System.register(['./services/my-date-picker.locale.service', './services/my-date-picker.date.validator.service', './my-date-picker.component', './my-date-picker.module'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (my_date_picker_locale_service_1_1) {
                exportStar_1(my_date_picker_locale_service_1_1);
            },
            function (my_date_picker_date_validator_service_1_1) {
                exportStar_1(my_date_picker_date_validator_service_1_1);
            },
            function (my_date_picker_component_1_1) {
                exportStar_1(my_date_picker_component_1_1);
            },
            function (my_date_picker_module_1_1) {
                exportStar_1(my_date_picker_module_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=index.js.map