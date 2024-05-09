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
      title: "Are you sure want to delete this category?",
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

function deletePost() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "modal__btn modal__btn-delete",
      cancelButton: "modal__btn modal__btn-cancel",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure want to delete this post?",
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
          text: "Post has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled delete post!",
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
          text: "Category has been created.",
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

function addNewLanguage() {
  const obj = {
    language: "",
    locale: "",
    flag: null,
  };
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
      title: "Create New Language",
      html: `
      <div class="container"> 
      <label for="newLanguage" class="label">Name:</label>
      <input id="newLanguage" type="text" class="swal2-input required">
      </div>
      <div class="container">
      <label for="newLocale" class="label">Locale:</label>
      <input id="newLocale" type="text"  class="swal2-input required" >
      </div>
     <div class="container">
     <label for="newFlag"  class="label">Flag image:</label>
     <input id="newFlag" type="file" accept="image/*" class="swal2-input">
     </div>
    `,
      preConfirm: function () {
        obj.language = document.getElementById("newLanguage").value.trim();
        obj.locale = document.getElementById("newLocale").value.trim();
        obj.flag = document.getElementById("newFlag").files[0];

        if (!obj.language || !obj.locale || !obj.flag) {
          let errorMessage = "You need to provide: ";

          swalWithBootstrapButtons.fire({
            title: "Fail",
            text: "Please fill in all required fields.",
            icon: "error",
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Created Successfully",
            text: "Language, Locale and Flag have been created.",
            icon: "success",
          });
          window.location.href = `../language/index.html?newLanguage=${obj.language}&newLocale=${obj.locale}&newFlag=${obj.flag}`;
        }
      },
    })
    .then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled create new Language",
          icon: "error",
        });
      }
    });
}

function updateLanguage() {
  const obj = {
    language: "",
    locale: "",
    flag: null,
  };
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
      title: "Update Language",
      html: `
      <div class="container"> 
      <label for="newLanguage" class="label">Name:</label>
      <input id="newLanguage" type="text" class="swal2-input required">
      </div>
      <div class="container">
      <label for="newLocale" class="label">Locale:</label>
      <input id="newLocale" type="text"  class="swal2-input required" >
      </div>
     <div class="container">
     <label for="newFlag"  class="label">Flag image:</label>
     <input id="newFlag" type="file" accept="image/*" class="swal2-input">
     </div>
    `,
      preConfirm: function () {
        obj.language = document.getElementById("newLanguage").value.trim();
        obj.locale = document.getElementById("newLocale").value.trim();
        obj.flag = document.getElementById("newFlag").files[0];

        if (!obj.language || !obj.locale || !obj.flag) {
          // Improved error message based on missing field(s)
          let errorMessage = "You need to provide: ";

          swalWithBootstrapButtons.fire({
            title: "Fail",
            text: "Please fill in all required fields.",
            icon: "error",
          });
        }

        // Your logic to create the new language and locale here (e.g., send data to server)
        // ...

        // Update UI or display success message using SweetAlert
        else {
          swalWithBootstrapButtons.fire({
            title: "Created Successfully",
            text: "Language, Locale and Flag have been updated.",
            icon: "success",
          });
          window.location.href = `../language/index.html?newLanguage=${obj.language}&newLocale=${obj.locale}&newFlag=${obj.flag}`;
        }
      },
    })
    .then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled create new Language",
          icon: "error",
        });
      }
    });
}

function deleteLanguage() {
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
          text: "Language has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Cancelled delete Language!",
          icon: "error",
        });
      }
    });
}
