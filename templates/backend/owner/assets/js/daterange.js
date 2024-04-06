$(function () {
    $('input[name="datetimes"]').daterangepicker({
        // timePicker: true,
        timePicker24Hour: true,
        timePickerSeconds: true,
        applyButtonClasses: "applyButton",
        cancelButtonClasses: "cancelButton",
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
});