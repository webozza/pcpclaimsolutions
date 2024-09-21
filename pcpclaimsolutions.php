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
define( 'PCPCLAIMSOLUTIONS_VERSION', '1.0.15' );

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

    // Enqueue Select2 CSS and JS with version control
    // wp_enqueue_style('select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), PCPCLAIMSOLUTIONS_VERSION);
    // wp_enqueue_script('select2-js', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array('jquery'), PCPCLAIMSOLUTIONS_VERSION, false);

    // Enqueue the JS file with version control, with jQuery as a dependency (if needed)
    wp_enqueue_script('pcpclaimsolutions-public-js', plugin_dir_url(__FILE__) . 'public/js/pcpclaimsolutions-public.js', array('jquery'), PCPCLAIMSOLUTIONS_VERSION, true);

    // Localize the script to pass the correct URLs
    wp_localize_script('pcpclaimsolutions-public-js', 'pcpclaims_plugin', array(
        'ajaxurl'    => admin_url('admin-ajax.php'), // Use WordPress's AJAX handler URL
        'plugin_url' => plugin_dir_url(__FILE__),    // Pass the plugin directory URL for assets
        'api_handler' => plugin_dir_url(__FILE__) . 'api-handler.php'
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
