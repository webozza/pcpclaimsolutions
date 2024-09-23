<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://pcpclaimsolutions.com/
 * @since             1.0.0
 * @package           Pcpclaimsolutions
 *
 * @wordpress-plugin
 * Plugin Name:       PCP Claim Solutions
 * Plugin URI:        https://pcpclaimsolutions.com/
 * Description:       This is a description of the plugin.
 * Version:           1.0.0
 * Author:            PCP Claim Solutions
 * Author URI:        https://pcpclaimsolutions.com//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       pcpclaimsolutions
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PCPCLAIMSOLUTIONS_VERSION', '1.0.20' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-pcpclaimsolutions-activator.php
 */
function activate_pcpclaimsolutions() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-pcpclaimsolutions-activator.php';
    Pcpclaimsolutions_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-pcpclaimsolutions-deactivator.php
 */
function deactivate_pcpclaimsolutions() {
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-pcpclaimsolutions-deactivator.php';
    Pcpclaimsolutions_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_pcpclaimsolutions' );
register_deactivation_hook( __FILE__, 'deactivate_pcpclaimsolutions' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-pcpclaimsolutions.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_pcpclaimsolutions() {

    $plugin = new Pcpclaimsolutions();
    $plugin->run();

}
run_pcpclaimsolutions();

// Enqueue CSS and JS files
add_action('wp_enqueue_scripts', 'pcpclaimsolutions_enqueue_assets');

function pcpclaimsolutions_enqueue_assets() {
    // Enqueue Google Fonts
    wp_enqueue_style('readex-pro-font', 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@160..700&display=swap', array(), null);

    // Enqueue the CSS file with version control
    wp_enqueue_style('pcpclaimsolutions-public-css', plugin_dir_url(__FILE__) . 'public/css/pcpclaimsolutions-public.css', array(), PCPCLAIMSOLUTIONS_VERSION);

    // Enqueue Swiper.js with version control
    wp_enqueue_style('swiper-css', 'https://unpkg.com/swiper/swiper-bundle.min.css', array(), PCPCLAIMSOLUTIONS_VERSION);
    wp_enqueue_script('swiper-js', 'https://unpkg.com/swiper/swiper-bundle.min.js', array(), PCPCLAIMSOLUTIONS_VERSION, true);

    // Enqueue Select2 CSS and JS
    wp_enqueue_style('select2-css', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css', array(), '4.0.13');
    wp_enqueue_script('select2-js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.full.min.js', array('jquery'), '4.0.13', true);

    // Enqueue the JS file with version control, with jQuery as a dependency (if needed)
    wp_enqueue_script('pcpclaimsolutions-public-js', plugin_dir_url(__FILE__) . 'public/js/pcpclaimsolutions-public.js', array('jquery', 'select2-js'), PCPCLAIMSOLUTIONS_VERSION, true);

    // Localize the script to pass the correct URLs
    wp_localize_script('pcpclaimsolutions-public-js', 'pcpclaims_plugin', array(
        'ajaxurl'    => admin_url('admin-ajax.php'), // Use WordPress's AJAX handler URL
        'plugin_url' => plugin_dir_url(__FILE__),    // Pass the plugin directory URL for assets
    ));
}

// Hook the function to initialize shortcodes
add_action('init', 'pcp_shortcode');

// Register the shortcode
function pcp_shortcode() {
    add_shortcode('pcp_form', 'pcp_shortcode_callback');
}

// The callback function for the shortcode
function pcp_shortcode_callback() {
    // Start output buffering
    ob_start();

    // Include the form.php file from the public/partials directory
    include plugin_dir_path(__FILE__) . 'public/partials/form.php';

    // Get the contents of the buffer and return it
    return ob_get_clean();
}

/**
 * Add an admin menu for viewing claim submissions
 */
function pcp_claim_add_admin_menu() {
    add_menu_page(
        'Claim Submissions',               // Page title
        'Claims',                          // Menu title
        'manage_options',                  // Capability required to see the menu
        'pcp_claim_submissions',           // Menu slug
        'pcp_claim_display_submissions',   // Callback function to render the page
        'dashicons-clipboard',             // Icon (you can change this to something else)
        20                                 // Menu position
    );
}
add_action('admin_menu', 'pcp_claim_add_admin_menu');

/**
 * Display the claim submissions in an admin table
 */
function pcp_claim_display_submissions() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'pcp_claim_entries';

    // Fetch entries from database
    $entries = $wpdb->get_results("SELECT * FROM $table_name ORDER BY date_submitted DESC");

    echo '<h1>Claim Submissions</h1>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Car Registration</th>
                <th>Finance Provider</th>
                <th>Car Cost</th>
                <th>Commission Aware</th>
                <th>Actions</th>
            </tr>
          </thead>';
    echo '<tbody>';

    foreach ($entries as $entry) {
        echo '<tr>';
        echo '<td>' . esc_html($entry->id) . '</td>';
        echo '<td>' . esc_html($entry->first_name) . '</td>';
        echo '<td>' . esc_html($entry->last_name) . '</td>';
        echo '<td>' . esc_html($entry->car_reg) . '</td>';
        echo '<td>' . esc_html($entry->finance_provider) . '</td>';
        echo '<td>' . esc_html($entry->car_cost) . '</td>';
        echo '<td>' . esc_html($entry->commission_aware) . '</td>';
        echo '<td>
                <button class="view-more" data-id="' . $entry->id . '">View More</button>
                <button class="delete-entry" data-id="' . $entry->id . '">Delete</button>
              </td>';
        echo '</tr>';
    }

    echo '</tbody></table>';
    
    // Add modal popup for viewing more details
    echo '
    <div id="view-more-modal" style="display:none;">
        <div class="modal-content">
            <span class="close">&times;</span>
            <div id="modal-body"></div>
        </div>
    </div>';
}

// Handle the vehicle enquiry via admin-ajax.php
function pcp_handler_vehicle_enquiry() {
    // Ensure the registration number is present in the request
    if (isset($_POST['registrationNumber'])) {
        $registrationNumber = sanitize_text_field($_POST['registrationNumber']); // Sanitize input

        // Prepare the request body and headers for the external API
        $body = json_encode(array(
            'registrationNumber' => $registrationNumber
        ));

        $response = wp_remote_post('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', array(
            'method'    => 'POST',
            'body'      => $body,
            'headers'   => array(
                'x-api-key'     => 'fSJ99ff9wB7AkRAC5tCiQ90nmdTKDXPM7nNTdf7i',
                'Content-Type'  => 'application/json',
            ),
            'timeout'   => 60, // Increase the timeout if necessary
        ));

        // Check for errors in the API request
        if (is_wp_error($response)) {
            wp_send_json_error(array('message' => 'Request failed: ' . $response->get_error_message()));
        }

        // Parse the response body
        $response_body = wp_remote_retrieve_body($response);
        $response_code = wp_remote_retrieve_response_code($response);

        // If the external API returns a 200, proceed, otherwise return an error
        if ($response_code == 200) {
            $data = json_decode($response_body, true); // Decode JSON response

            // Check if the data is valid and contains what you expect
            if (!empty($data) && isset($data['make'])) {
                wp_send_json_success($data); // Send back the data
            } else {
                wp_send_json_error(array('message' => 'Vehicle details not found or incomplete.'));
            }
        } else {
            wp_send_json_error(array('message' => 'Invalid response from the API. Status code: ' . $response_code));
        }
    } else {
        wp_send_json_error(array('message' => 'Vehicle registration number is required.'));
    }
}

// Register AJAX actions for both logged-in and non-logged-in users
add_action('wp_ajax_pcp_handle_vehicle_enquiry', 'pcp_handler_vehicle_enquiry');
add_action('wp_ajax_nopriv_pcp_handle_vehicle_enquiry', 'pcp_handler_vehicle_enquiry');


function pcp_claim_handle_form_submission() {
    global $wpdb;

    // Get form data from AJAX request
    $first_name = sanitize_text_field($_POST['first_name']);
    $last_name = sanitize_text_field($_POST['last_name']);
    $phone_number = sanitize_text_field($_POST['phone_number']);
    $email_address = sanitize_email($_POST['email_address']);
    $car_reg = sanitize_text_field($_POST['car_reg']);
    $car_make = sanitize_text_field($_POST['car_make']);
    $car_model = sanitize_text_field($_POST['car_model']);
    $car_year = sanitize_text_field($_POST['car_year']);
    $car_fuel = sanitize_text_field($_POST['car_fuel']);
    $car_colour = sanitize_text_field($_POST['car_colour']);
    $loan_type = sanitize_text_field($_POST['loan_type']);
    $finance_provider = sanitize_text_field($_POST['finance_provider']);
    $other_finance_provider = sanitize_text_field($_POST['other_finance_provider']);
    $car_cost = sanitize_text_field($_POST['car_cost']);
    $commission_aware = sanitize_text_field($_POST['commission_aware']);

    // Insert into database
    $table_name = $wpdb->prefix . 'pcp_claim_entries';
    
    $result = $wpdb->insert(
        $table_name,
        [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'phone_number' => $phone_number,
            'email_address' => $email_address,
            'car_reg' => $car_reg,
            'car_make' => $car_make,
            'car_model' => $car_model,
            'car_year' => $car_year,  // Insert validated car_year
            'car_fuel' => $car_fuel,
            'car_colour' => $car_colour,
            'loan_type' => $loan_type,
            'finance_provider' => $finance_provider,
            'other_finance_provider' => $other_finance_provider,
            'car_cost' => $car_cost,
            'commission_aware' => $commission_aware,
        ]
    );

    // Error handling: Check if the insert was successful or not
    if ( false === $result ) {
        // Log or output the error
        wp_send_json_error(['message' => 'Insert failed: ' . $wpdb->last_error]);
    } else {
        // Successfully inserted
        wp_send_json_success(['message' => 'Form submitted successfully!']);
    }
}

add_action('wp_ajax_pcp_claim_form_submit', 'pcp_claim_handle_form_submission');
add_action('wp_ajax_nopriv_pcp_claim_form_submit', 'pcp_claim_handle_form_submission');


function pcp_add_modal_popup() {
    ?>
    <div id="pcp-details-modal" style="display:none;">
        <div class="pcp-modal-content">
            <span id="pcp-close-modal" style="cursor: pointer;">&times;</span>
            <div id="pcp-modal-body"></div>
        </div>
    </div>

    <style>
        #pcp-details-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: none;
        }
        .pcp-modal-content {
            background-color: #fff;
            margin: 10% auto;
            padding: 20px;
            width: 50%;
        }
    </style>
    <?php
}
add_action('admin_footer', 'pcp_add_modal_popup');

// Get entry details via AJAX
add_action('wp_ajax_pcp_get_entry_details', 'pcp_get_entry_details');
function pcp_get_entry_details() {
    global $wpdb;
    $entry_id = intval($_POST['entry_id']);
    $table_name = $wpdb->prefix . 'pcp_claim_entries';
    
    $entry = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $entry_id));
    
    if ($entry) {
        $html = '<p><strong>First Name:</strong> ' . esc_html($entry->first_name) . '</p>';
        $html .= '<p><strong>Last Name:</strong> ' . esc_html($entry->last_name) . '</p>';
        $html .= '<p><strong>Email:</strong> ' . esc_html($entry->email_address) . '</p>';
        $html .= '<p><strong>Phone:</strong> ' . esc_html($entry->phone_number) . '</p>';
        $html .= '<p><strong>Car Reg:</strong> ' . esc_html($entry->car_reg) . '</p>';
        $html .= '<p><strong>Car Make:</strong> ' . esc_html($entry->car_make) . '</p>';
        $html .= '<p><strong>Car Model:</strong> ' . esc_html($entry->car_model) . '</p>';
        $html .= '<p><strong>Car Year:</strong> ' . esc_html($entry->car_year) . '</p>';
        $html .= '<p><strong>Car Fuel:</strong> ' . esc_html($entry->car_fuel) . '</p>';
        $html .= '<p><strong>Car Colour:</strong> ' . esc_html($entry->car_colour) . '</p>';
        $html .= '<p><strong>Loan Type:</strong> ' . esc_html($entry->loan_type) . '</p>';
        $html .= '<p><strong>Finance Provider:</strong> ' . esc_html($entry->finance_provider) . '</p>';
        $html .= '<p><strong>Other Finance Provider:</strong> ' . esc_html($entry->other_finance_provider) . '</p>';
        $html .= '<p><strong>Car Cost:</strong> ' . esc_html($entry->car_cost) . '</p>';
        $html .= '<p><strong>Commission Aware:</strong> ' . esc_html($entry->commission_aware) . '</p>';
        
        wp_send_json_success(['html' => $html]);
    } else {
        wp_send_json_error(['message' => 'Entry not found.']);
    }
}

// Delete entry via AJAX
add_action('wp_ajax_pcp_delete_entry', 'pcp_delete_entry');
function pcp_delete_entry() {
    global $wpdb;
    $entry_id = intval($_POST['entry_id']);
    $table_name = $wpdb->prefix . 'pcp_claim_entries';
    
    $deleted = $wpdb->delete($table_name, ['id' => $entry_id]);
    
    if ($deleted) {
        wp_send_json_success();
    } else {
        wp_send_json_error(['message' => 'Failed to delete entry.']);
    }
}
