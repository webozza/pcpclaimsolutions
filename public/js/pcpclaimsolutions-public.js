// FOR TESTING VINS
// DN56FFA
// AK57TBD
// AG09AUJ
// MA59FJK
// DN07AMV
// ABO8TZF
// AF06YRU
// SA56OZJ
// AD09XBY
// SK63AFZ
// CA59WZZ (Category N)
// AU13WKB
// MB54DAS
// NC06SAX
// KO17UGS (has finance record)
// testing auto deployment
// Mt16jno (rezwan checks with this)

/* Finance
------------------------------------------*/
// HY63NKA (has valuation data)
// BG13YAE (has valuation data)
// EY68AOJ
// V1AFA
// MF12NKA

/* Write-off
------------------------------------------*/
// R55PAP
// AD59OER
// YK04RFA
// WA66SUH
// EJ59YOA

/* Colour Change
------------------------------------------*/
// DE10AYW
// P667BUA
// AJ61AFN
// R190ABP
// KX06ADZ

/* MileageAnomalyDetected
------------------------------------------*/
// NA11VUS
// WA04DGZ
// P667BUA
// SD11YWA
// K690FAU

/* Plate Change
------------------------------------------*/
// AP57OKE
// HG60WAJ
// PP04SAV
// MH04ANR
// EA18RAU

/* Stolen Miaftr
------------------------------------------*/
// XAR888J
// SA15GLZ
// F550MAR
// F355CHA
// F812SFA

/* Stolen PNC
------------------------------------------*/
// BJ17AFN
// AV63ODS
// VK13VMA
// WG70MYA
// XAR888J

jQuery(document).ready(function ($) {
  var swiper = new Swiper(".swiper-container", {
    autoHeight: true,
    allowSlideNext: false,
    allowSlidePrev: false,
  });

  // Handle "Click here" to manually enter car details
  $("#manual-entry-trigger").on("click", function (e) {
    e.preventDefault(); // Prevent the default action of the link
    showFallbackForm(); // Show the fallback form

    // Move to the next slide where the fallback form will appear
    swiper.allowSlideNext = true;
    swiper.slideNext();
    swiper.allowSlideNext = false;
    updateProgressBar();
  });

  // Function to create the additional input field for "Other"
  function handleOtherSelection(inputSelector, otherFieldSelector) {
    $(inputSelector).on("change", function () {
      if ($(this).val() === "Other" || $(this).val() === "0") {
        $(otherFieldSelector).slideDown(function () {
          swiper.updateAutoHeight(300); // Update Swiper height with animation
        }); // Show the additional field if "Other" is selected
      } else {
        $(otherFieldSelector).slideUp(function () {
          swiper.updateAutoHeight(300); // Update Swiper height with animation
        }); // Hide it if another option is selected
      }
    });
  }

  let handleFinanceProviderSelection = () => {
    $('[name="finance-provider-name"]').change(function () {
      let isChecked = $(this).is(":checked");
      if (isChecked) {
        let yesNo = $(this).val();
        if (yesNo == "Yes") {
          $("#fp__selector").fadeIn();
          swiper.updateAutoHeight(300);
        } else {
          $("#fp__selector").hide();
          swiper.updateAutoHeight(300);
        }
      }
    });
  };

  handleFinanceProviderSelection();

  // Call the function for radio buttons
  handleOtherSelection('input[name="car-ownership"]', "#other-ownership-field");
  handleOtherSelection("#car-fuel", "#other-fuel-field");
  handleOtherSelection("#car-make", "#other-car-make-field");

  // Create the progress bar steps
  function createProgressSteps() {
    var totalSlides = swiper.slides.length;
    var progressBar = $(".progress-bar");
    progressBar.empty();

    for (var i = 0; i < totalSlides; i++) {
      var step = $('<div class="progress-step"></div>');
      progressBar.append(step);
    }

    // Add click functionality to active steps
    $(".progress-step").on("click", function () {
      var stepIndex = $(this).index();
      if ($(this).hasClass("active")) {
        swiper.slideTo(stepIndex);
        updateProgressBar();
      }
    });
  }

  // Function to update the progress bar based on the current slide
  function updateProgressBar() {
    var currentStep = swiper.activeIndex;

    // Loop through each progress step
    $(".progress-step").each(function (index) {
      if (index <= currentStep) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  }

  // Function to show the fallback form when no data is found
  function showFallbackForm() {
    $(".car-details").empty(); // Clear previous content before adding new content
    $(".confirmation-options.has-radio, .confirmation-text").remove();

    $(".car-details").html(`
        <div class="fallback-form">
            <div class="form-group">
                <select id="car-make" data-placeholder="Select Make">
                    <option value="" disabled selected>Select Make</option>
                    <option>Abarth</option>
                    <option>Alfa Romeo</option>
                    <option>Alpine</option>
                    <option>Aston Martin</option>
                    <option>Audi</option>
                    <option>BMW</option>
                    <option>Bentley</option>
                    <option>Cupra</option>
                    <option>Chevrolet</option>
                    <option>Chrysler</option>
                    <option>Citroen</option>
                    <option>Corvette</option>
                    <option>DS AUTOMOBILES</option>
                    <option>Dacia</option>
                    <option>Dodge</option>
                    <option>Ferrari</option>
                    <option>Fiat</option>
                    <option>Ford</option>
                    <option>Honda</option>
                    <option>Hyundai</option>
                    <option>Infiniti</option>
                    <option>Isuzu</option>
                    <option>Jaguar</option>
                    <option>Jeep</option>
                    <option>Kia</option>
                    <option>Lamborghini</option>
                    <option>Land Rover</option>
                    <option>Lexus</option>
                    <option>MG</option>
                    <option>MINI</option>
                    <option>Maserati</option>
                    <option>Mazda</option>
                    <option>McLaren</option>
                    <option>Mercedes-Benz</option>
                    <option>Mitsubishi</option>
                    <option>Nissan</option>
                    <option>Peugeot</option>
                    <option>Porsche</option>
                    <option>Renault</option>
                    <option>Rolls-Royce</option>
                    <option>SEAT</option>
                    <option>SKODA</option>
                    <option>Saab</option>
                    <option>Smart</option>
                    <option>Ssangyong</option>
                    <option>Subaru</option>
                    <option>Suzuki</option>
                    <option>Tesla</option>
                    <option>Toyota</option>
                    <option>Vauxhall</option>
                    <option>Volkswagen</option>
                    <option>Volvo</option>
                    <option value="0">Other (please specify)</option>
                </select>
            </div>
            <div id="other-car-make-field" class="form-group" style="display:none;">
                <input type="text" id="other-fuel" placeholder="Specify Other Make">
            </div>

            <div class="form-group">
                <input type="text" id="car-model" placeholder="Enter Model">
            </div>
            <div class="form-group">
                <input type="text" id="car-year" placeholder="Enter Year">
            </div>
            <div class="form-group">
                <select id="car-fuel" data-placeholder="Select Fuel Type">
                    <option value="" disabled selected>Select Fuel Type</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                    <option>Hydrogen</option>
                    <option>Biofuels</option>
                    <option value="CNG">Compressed Natural Gas (CNG)</option>
                    <option value="LPG">Liquefied Petroleum Gas (LPG)</option>
                    <option value="0">Other</option>
                <!-- Add other fuel types -->
                </select>
            </div>
            <div id="other-fuel-field" class="form-group" style="display:none;">
                <input type="text" id="other-fuel" placeholder="Specify Other Fuel Type">
            </div>
            <div class="form-group">
                <input type="text" id="car-colour" placeholder="Enter Colour">
            </div>
        </div>
    `);

    swiper.update();
    handleOtherSelection(
      'input[name="car-ownership"]',
      "#other-ownership-field"
    );
    handleOtherSelection("#car-fuel", "#other-fuel-field");
    handleOtherSelection("#car-make", "#other-car-make-field");
  }

  // Function to populate the car details in the next slide if data is found
  function populateCarDetails(data) {
    $(".car-details .make .data").text(data.make);
    $(".car-details .fuel-type .data").text(data.fuelType);
    $(".car-details .colour .data").text(data.colour);
  }

  // Function to show loading effect with the loader GIF
  function showLoadingEffect() {
    // Change the button text and add the loader GIF
    $(".next-btn").html(
      `<span>Processing...</span> <img src="${pcpclaims_plugin.plugin_url}public/assets/loader.gif" alt="Loading" class="loading-gif">`
    );
    $(".next-btn").prop("disabled", true); // Disable the button to prevent multiple clicks
  }

  // Validate registration number and make API request
  function handleNextButtonClick() {
    var currentSlide = swiper.activeIndex;

    if (currentSlide === 0) {
      // Slide 1: Car Registration Input validation
      var carReg = $("#car-reg").val();
      if (carReg === "") {
        alert("Please enter your car registration number.");
        return;
      }

      // Show the loading effect
      showLoadingEffect();

      // Perform AJAX call to the PHP file
      $.ajax({
        url: pcpclaims_plugin.api_handler,
        type: "POST",
        data: { registrationNumber: carReg },
        success: function (response) {
          // Handle the response from the API
          var data = JSON.parse(response);

          if (data.error || !data.make) {
            // If no data is found or an error is returned, show the fallback form
            showFallbackForm();
          } else {
            // If car data is found, populate the car details in the next slide
            populateCarDetails(data);
          }

          proceedToNextSlide();
        },
        error: function (xhr, status, error) {
          alert("API request failed: " + error);
          // In case of any error, show the fallback form
          showFallbackForm();
          proceedToNextSlide();
        },
        complete: function () {
          // Reset the button text back to 'Next'
          $(".next-btn").html("Next");
          $(".next-btn").prop("disabled", false); // Re-enable the button
        },
      });
    } else if (currentSlide === 1 && $(".fallback-form").length === 0) {
      // Slide 2: Car Details Confirmation validation (only if no fallback form)
      if (!validateRadioGroup('input[name="car-details-correct"]')) {
        alert("Please confirm whether the car details are correct.");
        return;
      }

      var isConfirmed = $('input[name="car-details-correct"]:checked').val();
      if (isConfirmed === "no") {
        showFallbackForm();
        return; // Don't proceed to the next slide
      } else {
        proceedToNextSlide();
      }
    } else if (currentSlide === 1 && $(".fallback-form").length > 0) {
      // Slide 2: Fallback Form Validation
      if (!validateFallbackForm()) {
        return; // If the fallback form has invalid fields, do not proceed
      }

      proceedToNextSlide();
    } else if (currentSlide === 2) {
      // Slide 3: Ownership Details validation
      if (!validateRadioGroup('input[name="car-ownership"]')) {
        alert("Please select the year you got the car.");
        return;
      }

      var ownershipValue = $('input[name="car-ownership"]:checked').val();
      if (ownershipValue === "Other" && $("#other-ownership").val() === "") {
        alert("Please specify the year you got the car.");
        return;
      }

      proceedToNextSlide();
    } else if (currentSlide === 3) {
      // Slide 4: Finance Details validation
      if (!validateRadioGroup('input[name="loan-type"]')) {
        alert("Please select your car loan type.");
        return;
      }

      proceedToNextSlide();
    } else if (currentSlide === 4) {
      // Slide 5: Qualification Questions validation
      if (!validateRadioGroup('input[name="commission-aware"]')) {
        alert("Please select whether you were aware of any commission.");
        return;
      }

      if (!validateRadioGroup('input[name="finance-provider-name"]')) {
        alert(
          "Please select whether you know the name of the finance provider."
        );
        return;
      }

      if (
        $('input[name="finance-provider-name"]:checked').val() === "Yes" &&
        $("#select-finance-provider select").val() === null
      ) {
        alert("Please select a finance provider.");
        return;
      }

      proceedToNextSlide();
    } else if (currentSlide === 5) {
      // Slide 6: Price validation
      if (!validateRadioGroup('input[name="car-cost"]')) {
        alert("Please select how much the car cost.");
        return;
      }

      proceedToNextSlide();
    } else if (currentSlide === 6) {
      // Slide 7: Final Details validation
      if (
        $("#first-name").val() === "" ||
        $("#last-name").val() === "" ||
        $("#email-address").val() === ""
      ) {
        alert("Please fill in all the required fields.");
        return;
      }

      proceedToNextSlide();
    }
  }

  // Helper function to validate if a radio group has a selected option
  function validateRadioGroup(selector) {
    return $(selector + ":checked").length > 0;
  }

  // Function to validate the fallback form
  function validateFallbackForm() {
    var carMake = $("#car-make").val();
    var carModel = $("#car-model").val();
    var carYear = $("#car-year").val();
    var carFuel = $("#car-fuel").val();
    var carColour = $("#car-colour").val();

    if (!carMake) {
      alert("Please select the car make.");
      return false;
    }

    if (carMake === "0" && $("#other-car-make-field input").val() === "") {
      alert("Please specify the car make.");
      return false;
    }

    if (carModel === "") {
      alert("Please enter the car model.");
      return false;
    }

    if (carColour === "") {
      alert("Please enter the car colour.");
      return false;
    }

    if (carYear === "") {
      alert("Please enter the car year.");
      return false;
    }

    if (!carFuel) {
      alert("Please select the fuel type.");
      return false;
    }

    if (carFuel === "0" && $("#other-fuel-field input").val() === "") {
      alert("Please specify the fuel type.");
      return false;
    }

    return true;
  }

  // Function to proceed to the next slide
  function proceedToNextSlide() {
    swiper.allowSlideNext = true;
    swiper.slideNext();
    swiper.allowSlideNext = false;
    updateProgressBar();
  }

  // Unbind any existing click event handlers to prevent duplicate binding
  $(".next-btn").off("click").on("click", handleNextButtonClick);

  // Initialize the progress steps and update the bar on load
  createProgressSteps(); // Create progress steps dynamically
  updateProgressBar(); // Set the initial state of the progress bar

  // Update progress bar when the slide changes
  swiper.on("slideChange", function () {
    updateProgressBar(); // Update the progress bar when Swiper detects a slide change
  });
});
