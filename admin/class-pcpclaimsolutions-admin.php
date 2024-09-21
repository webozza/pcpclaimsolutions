<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://https://pcpclaimsolutions.com/
 * @since      1.0.0
 *
 * @package    Pcpclaimsolutions
 * @subpackage Pcpclaimsolutions/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Pcpclaimsolutions
 * @subpackage Pcpclaimsolutions/admin
 * @author     PCP Claim Solutions <info@pcpclaimsolutions.com>
 */
class Pcpclaimsolutions_Admin {

    private $plugin_name;
    private $version;

    public function __construct( $plugin_name, $version ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
        wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/pcpclaimsolutions-admin.css', array(), $this->version, 'all' );
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {
        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/pcpclaimsolutions-admin.js', array( 'jquery' ), $this->version, false );
    }

}

