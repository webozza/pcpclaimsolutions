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

  // Store the original content of the entire form
  const originalFormContent = $(".form-container").html(); // Store the form content including all elements

  // Function to reset the entire form and reinitialize everything
  function resetForm() {
    // Reset the form content by injecting the original HTML
    $(".form-container").html(originalFormContent);
    submitForm();

    // Reinitialize the swiper instance after resetting the form
    swiper = new Swiper(".swiper-container", {
      autoHeight: true,
      allowSlideNext: false,
      allowSlidePrev: false,
    });

    // Reinitialize listeners for all form elements and swiper navigation
    reinitializeListeners();

    // Reset swiper navigation to the first slide
    swiper.allowSlidePrev = true;
    swiper.slideTo(0); // Slide back to the first step
    swiper.allowSlidePrev = false;

    // Update the progress bar
    updateProgressBar();
  }

  // Handle "Click here" to manually enter car details
  function initializeManualEntryTrigger() {
    $("#manual-entry-trigger")
      .off("click")
      .on("click", function (e) {
        e.preventDefault();
        showFallbackForm();
        swiper.allowSlideNext = true;
        swiper.slideNext();
        swiper.allowSlideNext = false;
        updateProgressBar();
      });
  }

  initializeManualEntryTrigger();

  // Function to create the additional input field for "Other"
  function handleOtherSelection(inputSelector, otherFieldSelector) {
    $(inputSelector).on("change", function () {
      if ($(this).val() === "Other" || $(this).val() === "0") {
        $(otherFieldSelector).slideDown(function () {
          swiper.updateAutoHeight(300);
        });
      } else {
        $(otherFieldSelector).slideUp(function () {
          swiper.updateAutoHeight(300);
        });
      }
    });
  }

  // Function to handle the finance provider and ownership year
  function handleOwnershipSelection() {
    $('input[name="car-ownership"]')
      .off("change")
      .on("change", function () {
        var selectedOwnership = $(this).val();
        if (selectedOwnership === "Other") {
          $("#other-ownership-field").slideDown(function () {
            swiper.updateAutoHeight(300);
          });
          $("#other-ownership")
            .off("input")
            .on("input", function () {
              var customYear = parseInt($(this).val(), 10);
              if (customYear > 2021) {
                showIneligibilityMessage();
              }
            });
        } else {
          $("#other-ownership-field").slideUp(function () {
            swiper.updateAutoHeight(300);
          });
        }
      });
  }

  function handleFinanceProviderSelection() {
    $('[name="finance-provider-name"]')
      .off("change")
      .on("change", function () {
        let yesNo = $(this).val();
        if (yesNo === "Yes") {
          $("#fp__selector").fadeIn();
          swiper.updateAutoHeight(300);
        } else {
          $("#fp__selector").hide();
          swiper.updateAutoHeight(300);
        }
      });

    $(".finance-provider-selector")
      .off("change")
      .on("change", function () {
        var selectedOption = $(this).find(":selected");
        var isClaimable = selectedOption.attr("data-claimable") === "true";

        // Show "Other" input field if "Other" is selected
        if ($(this).val() === "Other") {
          $("#other-finance-provider-field").slideDown(function () {
            swiper.updateAutoHeight(300);
          });
        } else {
          $("#other-finance-provider-field").slideUp(function () {
            swiper.updateAutoHeight(300);
          });
        }

        // Check if the selected finance provider is claimable
        if (!isClaimable && $(this).val() !== "Other") {
          showIneligibilityMessage();
        }
      });
  }

  // Initialize ownership and finance provider handlers
  handleOwnershipSelection();
  handleFinanceProviderSelection();

  // Function to show the "not eligible" message on the last slide
  function showIneligibilityMessage() {
    swiper.allowSlideNext = true;
    swiper.slideTo(swiper.slides.length - 1);
    swiper.allowSlideNext = false;

    $(".swiper-slide").last().html(`
      <div class="ineligibility-message" style="text-align: center;">
        <img src="/wp-content/plugins/pcpclaimsolutions/public/assets/not-eligible.png" alt="Not Eligible" style="width: 50px; margin-bottom: 20px;">
        <h3>We're sorry but you're not eligible for a claim.</h3>
        <button class="restart-btn">Check another vehicle</button>
      </div>
    `);

    $(".restart-btn").on("click", function () {
      restartForm();
    });
  }

  // Function to handle finance provider and ownership selection
  function reinitializeListeners() {
    handleFinanceProviderSelection();
    handleOwnershipSelection();
    handleOtherSelection(
      'input[name="car-ownership"]',
      "#other-ownership-field"
    );
    handleOtherSelection("#car-fuel", "#other-fuel-field");
    handleOtherSelection("#car-make", "#other-car-make-field");

    $('input[name="car-details-correct"]').on("change", function () {
      var isConfirmed = $(this).val();
      if (isConfirmed === "no") {
        // Show the fallback form
        showFallbackForm();
        // Prevent swiper from moving forward
        swiper.allowSlideNext = false;
      } else {
        // Allow moving forward if "yes" is selected
        swiper.allowSlideNext = true;
      }
    });

    // Attach the next button listener
    $(".next-btn").off("click").on("click", handleNextButtonClick);
  }

  // Function to restart the form and take the user back to the first slide
  function restartForm() {
    resetForm(); // Reset the entire form using the resetForm function
  }

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
                <input type="text" id="other-car-make" placeholder="Specify Other Make">
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
                    <option value="0">Other (please specify)</option>
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

    // Reinitialize the event listeners after rendering the fallback form
    reinitializeListeners();

    // Update the Swiper height after inserting new content
    swiper.update();
  }

  let apiCarMake = "";
  let apiCarFuel = "";
  let apiCarColour = "";

  // Function to populate the car details in the next slide if data is found
  function populateCarDetails(data) {
    // Populate the global variables with the API response
    apiCarMake = data.make;
    apiCarFuel = data.fuelType;
    apiCarColour = data.colour;

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

  // Function to handle the next button click
  function handleNextButtonClick() {
    var currentSlide = swiper.activeIndex;

    // Disable slide to next by default
    swiper.allowSlideNext = false;

    // Slide 0: Car registration entry and API call
    if (currentSlide === 0) {
      var carReg = $("#car-reg").val().replace(/\W/g, ""); // Remove non-alphanumeric characters
      if (carReg === "") {
        alert("Please enter your car registration number.");
        return;
      }

      showLoadingEffect();

      $.ajax({
        url: pcpclaims_plugin.ajaxurl, // This should point to admin-ajax.php
        type: "POST",
        data: {
          action: "pcp_handle_vehicle_enquiry", // The action registered in your PHP
          registrationNumber: carReg, // The sanitized car registration number
        },
        success: function (response) {
          if (response.success) {
            populateCarDetails(response.data);
            swiper.allowSlideNext = true; // Enable slide to next only if successful
            proceedToNextSlide();
          } else {
            showFallbackForm();
            swiper.allowSlideNext = true; // Enable next slide after showing fallback form
            proceedToNextSlide();
          }
        },
        error: function () {
          showFallbackForm();
          swiper.allowSlideNext = true; // Enable slide to next in case of error
          proceedToNextSlide();
        },
        complete: function () {
          $(".next-btn").html("Next").prop("disabled", false);
        },
      });

      // Slide 1: Car Details Confirmation
    } else if (currentSlide === 1 && $(".fallback-form").length === 0) {
      if (!validateRadioGroup('input[name="car-details-correct"]')) {
        alert("Please confirm whether the car details are correct.");
        return;
      }

      var isConfirmed = $('input[name="car-details-correct"]:checked').val();
      if (isConfirmed === "no") {
        // Show fallback form if "No" is selected for car details
        showFallbackForm();
        swiper.allowSlideNext = false;
        swiper.slideTo(currentSlide);
        return;
      } else {
        swiper.allowSlideNext = true; // Enable slide to next if validation passes
        proceedToNextSlide();
      }

      // Slide 2: Ownership Year Selection
    } else if (currentSlide === 2) {
      if (!validateRadioGroup('input[name="car-ownership"]')) {
        alert("Please select the ownership year.");
        return;
      }
      swiper.allowSlideNext = true; // Enable slide to next if validation passes
      proceedToNextSlide();

      // Slide 3: Finance Provider validation
    } else if (currentSlide === 3) {
      if (!validateRadioGroup('input[name="loan-type"]')) {
        // Validation added here
        alert("Please select a loan type.");
        return;
      }
      swiper.allowSlideNext = true; // Enable slide to next if validation passes
      proceedToNextSlide();

      // Slide 4: Commission Aware and Finance Provider validation
    } else if (currentSlide === 4) {
      // Validate commission-aware selection
      if (!validateRadioGroup('input[name="commission-aware"]')) {
        alert("Please confirm whether you were aware of the commission.");
        return;
      }

      // Validate finance provider selection
      if (!validateRadioGroup('input[name="finance-provider-name"]')) {
        alert("Please confirm if you know the name of the finance provider.");
        return;
      }

      // If the user selected "Yes" for "Do you know the finance provider?"
      var financeProviderSelection = $(
        'input[name="finance-provider-name"]:checked'
      ).val();
      if (financeProviderSelection === "Yes") {
        var selectedProvider = $(".finance-provider-selector").val();

        // Ensure a finance provider is selected from the dropdown
        if (
          !selectedProvider ||
          selectedProvider === "Select Finance Provider"
        ) {
          alert("Please select a finance provider.");
          return;
        }
      }

      swiper.allowSlideNext = true; // Enable slide to next if validation passes
      proceedToNextSlide();

      // Slide 5: Car Cost Selection
    } else if (currentSlide === 5) {
      if (!validateRadioGroup('input[name="car-cost"]')) {
        alert("Please select how much the car cost.");
        return;
      }
      swiper.allowSlideNext = true; // Enable slide to next if validation passes
      proceedToNextSlide();

      // Fallback Form validation on Slide 1 (if applicable)
    } else if (currentSlide === 1 && $(".fallback-form").length > 0) {
      if (!validateFallbackForm()) {
        return;
      }
      swiper.allowSlideNext = true; // Enable slide to next if validation passes
      proceedToNextSlide();

      // Default case for other slides
    } else {
      swiper.allowSlideNext = true; // Allow slide to next for other cases
      proceedToNextSlide();
    }
  }

  // Helper function to validate if a radio group has a selected option
  function validateRadioGroup(selector) {
    return $(selector + ":checked").length > 0;
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
    if (!carModel || !carYear || !carFuel || !carColour) {
      alert("Please fill in all the fields.");
      return false;
    }
    return true;
  }

  function submitForm() {
    $(".submit-pcp-request")
      .off("click")
      .on("click", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Check if the privacy policy checkbox is checked
        if (!$("#privacy-policy").is(":checked")) {
          alert("You must agree to the privacy policy before submitting.");
          return; // Prevent form submission
        }

        // Perform validation for required fields
        var firstName = $("#first-name").val();
        var lastName = $("#last-name").val();
        var phoneNumber = $("#phone-number").val();
        var emailAddress = $("#email-address").val();
        var carReg = $("#car-reg").val();

        // Email validation
        if (!validateEmail(emailAddress)) {
          alert("Please enter a valid email address.");
          return; // Prevent form submission if email is invalid
        }

        if (!firstName || !lastName || !carReg) {
          alert(
            "Please fill in the required fields (First Name, Last Name, and Car Registration)."
          );
          return;
        }

        // Determine whether to use fallback form data or API data
        let carMake, carFuel, carColour;

        if ($(".fallback-form").length > 0) {
          // Fallback form is present, use the values from the form
          carMake = $("#car-make").val();
          carFuel = $("#car-fuel").val();
          carColour = $("#car-colour").val();
          carYear = $("#car-year").val();
        } else {
          // No fallback form, use the API response data
          carMake = apiCarMake;
          carFuel = apiCarFuel;
          carColour = apiCarColour;
          carYear = $('[name="car-ownership"]:checked').val();
        }

        // Collect form data
        const data = {
          action: "pcp_claim_form_submit", // The action name registered in PHP
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email_address: emailAddress,
          car_reg: carReg,
          car_make: carMake,
          car_model: $("#car-model").val(),
          car_year: carYear,
          car_fuel: carFuel,
          car_colour: carColour,
          loan_type: $("input[name='loan-type']:checked").val(),
          finance_provider: $(".finance-provider-selector").val(),
          other_finance_provider: $("#other-finance-provider").val(),
          commission_aware: $('[name="commission-aware"]:checked').val(),
          car_cost: $('[name="car-cost"]:checked').val(),
        };

        // Proceed with AJAX request
        $.post(pcpclaims_plugin.ajaxurl, data, function (response) {
          // Check if the submission is successful
          if (response.success) {
            // Clear the last slide's content and display success message
            const lastSlide = $(".swiper-slide").last();
            lastSlide.html(`
                  <div class="success-message" style="text-align: center;">
                      <img src="/wp-content/plugins/pcpclaimsolutions/public/assets/success.png" alt="Success" style="width: 50px; margin-bottom: 20px;">
                      <h3>Thank you! Your claim has been submitted successfully.</h3>
                      <button class="restart-btn">Submit another claim</button>
                  </div>
              `);

            // Reinitialize the "restart" button to reset the form when clicked
            $(".restart-btn").on("click", function () {
              restartForm();
            });

            // Go to the last slide to show the success message
            swiper.allowSlideNext = true;
            swiper.slideTo(swiper.slides.length - 1);
            swiper.allowSlideNext = false;
          } else {
            alert(response.data.message || "Failed to submit the form.");
          }
        }).fail(function (xhr, status, error) {
          console.error("AJAX error:", status, error);
          alert("There was an error submitting your request.");
        });
      });
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
  submitForm();

  // Update progress bar when the slide changes
  swiper.on("slideChange", function () {
    updateProgressBar(); // Update the progress bar when Swiper detects a slide change
  });
});
