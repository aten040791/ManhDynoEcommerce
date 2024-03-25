function deleteCategory() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "modal__btn modal__btn-delete",
      cancelButton: "modal__btn modal__btn-cancel",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled delete category!",
          icon: "error",
        });
      }
    });
}

function addNewCategory() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "modal__btn modal__btn-create",
      cancelButton: "modal__btn modal__btn-delete",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      title: "Create new category",
      input: "text",
      inputPlaceholder: "Input new category...",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Created Successfully",
          text: "Category has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled create new category",
          icon: "error",
        });
      }
    });
}

function updateCategory() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "modal__btn modal__btn-update",
      cancelButton: "modal__btn modal__btn-delete",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      title: "Edit category",
      input: "text",
      inputValue: "ReactJs",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Updated Successfully",
          text: "Category has been updated.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled update category",
          icon: "error",
        });
      }
    });
}
