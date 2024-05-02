$(function () {
  $('input[name="datetimes"]').daterangepicker({
    // timePicker: true,
    timePicker24Hour: true,
    timePickerSeconds: true,
    applyButtonClasses: "modal__btn modal__btn-update",
    cancelButtonClasses: "modal__btn modal__btn-cancel",
    startDate: moment().startOf("hour"),
    endDate: moment().startOf("hour").add(32, "hour"),
    locale: {
      format: "DD/MM/YYYY",
    },
  });
});
