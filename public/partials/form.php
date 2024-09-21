<?php
    $able_to_claim = [
        'Barclays Financial Services', 
        'BMW Finance', 
        'Blue Motor Finance', 
        'Close Brothers', 
        'Fiat Finance', 
        'Ford Finance', 
        'Land Rover Finance', 
        'Lloyds Banking Group/Black Horse', 
        'Mazda Finance', 
        'Mercedes-Benz Finance', 
        'MotoNovo', 
        'Nissan Finance', 
        'Peugeot Finance', 
        'Renault Finance', 
        'Santander', 
        'Vauxhall Finance', 
        'Volkswagen/Audi Finance'
    ];

    $not_able_to_claim = [
        '1st Stop Finance', 
        'Admiral', 
        'Advantage Finance', 
        'Autolend', 
        'Auto Money', 
        'Bank of Scotland', 
        'Billing Finance', 
        'Burnley Savings & Loans', 
        'Car Loan Centre', 
        'Carmoola', 
        'First Response Finance', 
        'Glenside Finance', 
        'Guardian Finance', 
        'Halifax', 
        'Lendable', 
        'Lloyds (excluding Black Horse)', 
        'Mallard Finance', 
        'MoneyBarn', 
        'Oodle Car Finance', 
        'Oplo', 
        'Premium Plan', 
        'RateSetter', 
        'Retail Money Market', 
        'Specialist Motor Finance', 
        'Tandem', 
        'Vehicle Credit', 
        'V12 Vehicle Finance'
    ];
?>

<div class="form-container pcp-checker">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <!-- Slide 1: Car Registration Input -->
            <div class="swiper-slide">
                <h1>Start Online Check</h1>
                <div>
                    <input type="text" id="car-reg" placeholder="YOUR REGISTRATION" required>
                </div>
                <div class="ssl-info">
                    <!-- Inline SVG for lock icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                        <rect x="1" y="5" width="14" height="14" rx="3" stroke="#121212" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M12 5a4 4 0 0 0-8 0" stroke="#121212" stroke-width="2"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12.732A2 2 0 0 0 8 9a2 2 0 0 0-1 3.732V16h2v-3.268z" fill="#121212"/>
                    </svg>
                    <span>SSL data encryption</span>
                </div>

                <div>
                    <p>Not sure what your reg is or did you have a private number plate? <a href="#" id="manual-entry-trigger">Click here <span>>></span></a></p>
                </div>
                <div>
                    <button class="next-btn">Check my Vehicle</button>
                </div>
            </div>

            <!-- Slide 2: Car Details Confirmation -->
            <div class="swiper-slide">
                <h3>Your Car Details</h3>
                <div class="car-details">
                    <div class="car-detail-item make">
                        <strong>Make</strong>
                        <div class="data"></div>
                    </div>
                    <div class="car-detail-item fuel-type">
                        <strong>Fuel Type</strong>
                        <div class="data"></div>
                    </div>
                    <div class="car-detail-item colour">
                        <strong>Colour</strong>
                        <div class="data"></div>
                    </div>
                </div>

                <p class="confirmation-text">Are these details correct?</p>
                <div class="confirmation-options has-radio">
                    <input type="radio" id="yes" name="car-details-correct" value="yes">
                    <label for="yes">Yes</label>
                    
                    <input type="radio" id="no" name="car-details-correct" value="no">
                    <label for="no">No</label>
                </div>

                <div>
                    <button class="next-btn">Next</button>
                </div>
            </div>

            <!-- Slide 3: Ownership Details -->
            <div class="swiper-slide">
                <h3>Your Ownership</h3>
                <p>What year did you get the car?</p>

                <div class="ownership-options has-radio">
                    <input type="radio" id="year1" name="car-ownership" value="2007-2013">
                    <label for="year1">2007-2013</label>

                    <input type="radio" id="year2" name="car-ownership" value="2014-2021">
                    <label for="year2">2014-2021</label>

                    <input type="radio" id="other" name="car-ownership" value="Other">
                    <label for="other">Other</label>
                </div>

                <!-- The extra field for "Other" ownership selection -->
                <div id="other-ownership-field" class="form-group" style="display:none;">
                    <input type="text" id="other-ownership" placeholder="2022">
                </div>

                <div>
                    <button class="next-btn">Next</button>
                </div>
            </div>

            <!-- Step 4: Finance Details -->
             <div class="swiper-slide">
                <h3>Your Finance Details</h3>

                <p>Which type of car loan did you choose?</p>
                <div class="loan-options has-radio field-group">
                    <input type="radio" id="pcp" name="loan-type" value="PCP">
                    <label for="pcp">PCP</label>

                    <input type="radio" id="hirepurchase" name="loan-type" value="Hire Purchase">
                    <label for="hirepurchase">Hire Purchase</label>

                    <input type="radio" id="notsure" name="loan-type" value="Not Sure">
                    <label for="notsure">Not Sure</label>
                </div>

                <div>
                    <button class="next-btn">Next</button>
                </div>

             </div>

             <!-- Step 5: Qualification Questions -->
              <div class="swiper-slide qualification-questions">
                <h3>Qualification Questions</h3>

                <p>Were you aware that any commission would be paid to a car/vehicle dealer in relation to your loan?</p>
                <div class="commission-aware-options has-radio field-group">
                    <input type="radio" id="cayes" name="commission-aware" value="Yes">
                    <label for="cayes">Yes</label>

                    <input type="radio" id="cano" name="commission-aware" value="No">
                    <label for="cano">No</label>
                </div>

                <p>Do you know the name of the finance provider?</p>
                <div class="finance-provider-name-known-options has-radio field-group">
                    <input type="radio" id="fpyes" name="finance-provider-name" value="Yes">
                    <label for="fpyes">Yes</label>

                    <input type="radio" id="fpno" name="finance-provider-name" value="No">
                    <label for="fpno">No</label>
                </div>

                <div id="fp__selector" class="form-group" style="display:none;">
                    <select class="finance-provider-selector">
                        <option disabled selected>Select Finance Provider</option>
                        <?php 
                        // Loop through able to claim providers
                        foreach ($able_to_claim as $provider) {
                            echo '<option value="' . $provider . '" data-claimable="true">' . $provider . '</option>';
                        }

                        // Loop through not able to claim providers
                        foreach ($not_able_to_claim as $provider) {
                            echo '<option value="' . $provider . '" data-claimable="false">' . $provider . '</option>';
                        }
                        ?>
                    </select>
                </div>

                <div> 
                    <button class="next-btn">Next</button>
                </div>

              </div>

             <!-- Step 6: Price -->
             <div class="swiper-slide">
                <h3>Finance Amount</h3>

                <p>How much did the car cost?</p>
                <div class="cost-options has-radio field-group">
                    <input type="radio" id="low-price" name="car-cost" value="£0 - £10,000">
                    <label for="low-price">£0 - £10,000</label>

                    <input type="radio" id="med-price" name="car-cost" value="£10,000 - £20,000">
                    <label for="med-price">£10,000 - £20,000</label>

                    <input type="radio" id="high-price" name="car-cost" value="£20,000+<">
                    <label for="high-price">£20,000+</label>
                </div>

                <div>
                    <button class="next-btn">Next</button>
                </div>

             </div>

            <!-- Slide 7: Completion -->
            <div class="swiper-slide">
                <div class="success-icon">
                    <img src="/wp-content/plugins/pcpclaimsolutions/public/assets/success.png">
                </div>
                <h3>Great news, you may qualify!</h3>
                <p>Complete your details below to find out how much your claim might be worth:</p>

                <div class="field-group">
                    <div class="form-group">
                        <input type="text" id="first-name" placeholder="First Name *">
                    </div>
                    <div class="form-group">
                        <input type="text" id="last-name" placeholder="Last Name *">
                    </div>
                    <div class="form-group">
                        <input type="text" id="phone-number" placeholder="Phone Number">
                    </div>
                    <div class="form-group">
                        <input type="email" id="email-address" placeholder="Email Address">
                    </div>
                </div>

                <!-- Privacy Policy Checkbox -->
                <div class="form-group pp-checkbox">
                    <input type="checkbox" id="privacy-policy"> 
                    <p>I agree to the <a href="/privacy-policy" target="_blank">Privacy Policy</a></p>
                </div>

                <div>
                    <button class="submit-pcp-request">Submit Request</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Global Progress Bar but INSIDE the form container -->
    <div class="progress-bar"></div>
</div>
