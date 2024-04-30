CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
  toolbar: {
    items: [
      "undo",
      "redo",
      "findAndReplace",
      "|",
      "heading",
      "bold",
      "italic",
      "underline",
      "blockQuote",
      "|",
      "alignment",
      "bulletedList",
      "numberedList",
      "|",
      "fontSize",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "|",
      "link",
      "uploadImage",
      "insertTable",
      "mediaEmbed",
      "codeBlock",
      "specialCharacters",
      "|",
    ],
    shouldNotGroupWhenFull: true,
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4",
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5",
      },
      {
        model: "heading6",
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6",
      },
    ],
  },
  placeholder: "Welcome to Coding Blog!",
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, serif",
      "Lucida Sans Unicode, Lucida Grande, sans-serif",
      "Tahoma, Geneva, sans-serif",
      "Times New Roman, Times, serif",
      "Trebuchet MS, Helvetica, sans-serif",
      "Verdana, Geneva, sans-serif",
    ],
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, "default", 18, 20, 22],
    supportAllValues: true,
  },
  link: {
    decorators: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file",
        },
      },
    },
  },

  removePlugins: [
    "AIAssistant",
    "CKBox",
    "CKFinder",
    "EasyImage",
    "RealTimeCollaborativeComments",
    "RealTimeCollaborativeTrackChanges",
    "RealTimeCollaborativeRevisionHistory",
    "PresenceList",
    "Comments",
    "TrackChanges",
    "TrackChangesData",
    "RevisionHistory",
    "Pagination",
    "WProofreader",
    "MathType",
    "SlashCommand",
    "Template",
    "DocumentOutline",
    "FormatPainter",
    "TableOfContents",
    "PasteFromOfficeEnhanced",
    "CaseChange",
  ],
});

CKEDITOR.ClassicEditor.create(document.getElementById("editor-vn"), {
  toolbar: {
    items: [
      "undo",
      "redo",
      "findAndReplace",
      "|",
      "heading",
      "bold",
      "italic",
      "underline",
      "blockQuote",
      "|",
      "alignment",
      "bulletedList",
      "numberedList",
      "|",
      "fontSize",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "|",
      "link",
      "uploadImage",
      "insertTable",
      "mediaEmbed",
      "codeBlock",
      "specialCharacters",
    ],
    shouldNotGroupWhenFull: true,
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4",
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5",
      },
      {
        model: "heading6",
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6",
      },
    ],
  },
  placeholder: "Chào mừng tới Coding Blog!",
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, serif",
      "Lucida Sans Unicode, Lucida Grande, sans-serif",
      "Tahoma, Geneva, sans-serif",
      "Times New Roman, Times, serif",
      "Trebuchet MS, Helvetica, sans-serif",
      "Verdana, Geneva, sans-serif",
    ],
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, "default", 18, 20, 22],
    supportAllValues: true,
  },
  link: {
    decorators: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file",
        },
      },
    },
  },

  removePlugins: [
    "AIAssistant",
    "CKBox",
    "CKFinder",
    "EasyImage",
    "RealTimeCollaborativeComments",
    "RealTimeCollaborativeTrackChanges",
    "RealTimeCollaborativeRevisionHistory",
    "PresenceList",
    "Comments",
    "TrackChanges",
    "TrackChangesData",
    "RevisionHistory",
    "Pagination",
    "WProofreader",
    "MathType",
    "SlashCommand",
    "Template",
    "DocumentOutline",
    "FormatPainter",
    "TableOfContents",
    "PasteFromOfficeEnhanced",
    "CaseChange",
  ],
});

document.addEventListener("DOMContentLoaded", function () {
  const optionsMenu = document.querySelectorAll("#select-menu");
  const textEditor = document.querySelectorAll(".ck-editor__main");

  for (var i = 0; i < optionsMenu.length; i++) {
    const selectBtn = optionsMenu[i].querySelector("#select-menu-btn");
    selectBtn.addEventListener("click", () => {
      selectBtn.classList.toggle("icon-down");
      selectBtn.parentElement
        .querySelector("#select-options")
        .classList.toggle("d-none");
    });
    const options = optionsMenu[i].querySelectorAll("#select-option");
    const sBtn_text = optionsMenu[i].querySelector("#select-title");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        let selectedOption = option.querySelector(
          "#select-option-text"
        ).innerText;
        sBtn_text.innerText = selectedOption;
        option.parentElement.classList.add("d-none");
        option.parentElement.parentElement.parentElement
          .querySelector("#select-menu-btn")
          .classList.toggle("icon-down");
      });
    });
  }
  for (var i = 0; i < textEditor.length; i++) {
    textEditor[i].addEventListener("click", () => {
      for (var i = 0; i < optionsMenu.length; i++) {
        const selectBtn = optionsMenu[i].querySelector("#select-menu-btn");
        const selectOptions = optionsMenu[i].querySelector("#select-options");
        selectBtn.classList.toggle("icon-down");
        selectOptions.classList.add("d-none");
      }
    });
  }
});
