let qrCode = null;

const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const logoInput = document.getElementById("logoUpload");
const logoName = document.getElementById("logoName");

generateBtn.addEventListener("click", () => {
  const qrText = document.getElementById("qrText").value.trim();
  const qrSize = parseInt(document.getElementById("qrSize").value);
  const qrColor = document.getElementById("qrColor").value;
  const bgColor = document.getElementById("bgColor").value;
  const logoFile = logoInput.files[0];

  if (!qrText) {
    alert("Please enter text or URL.");
    return;
  }

  const options = {
    width: qrSize,
    height: qrSize,
    type: "canvas",
    data: qrText,
    image: "",
    dotsOptions: {
      color: qrColor,
      type: "rounded",
    },
    backgroundOptions: {
      color: bgColor,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10,
    },
  };

  if (logoFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      options.image = e.target.result;
      renderQR(options);
    };
    reader.readAsDataURL(logoFile);
  } else {
    renderQR(options);
  }
});

function renderQR(options) {
  const qrContainer = document.getElementById("qrContainer");
  qrContainer.innerHTML = "";

  qrCode = new QRCodeStyling(options);
  qrCode.append(qrContainer);

  downloadBtn.style.display = "inline-block";
}

// File preview
logoInput.addEventListener("change", () => {
  const file = logoInput.files[0];
  if (file) {
    logoName.textContent =
      file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
  } else {
    logoName.textContent = "No file chosen";
  }
});

// Download
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (qrCode) {
    qrCode.download({ name: "qrcode", extension: "png" });
  }
});
