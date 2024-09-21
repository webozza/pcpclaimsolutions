<?php

/**
 * Fired during plugin activation
 *
 * @link       https://https://pcpclaimsolutions.com/
 * @since      1.0.0
 *
 * @package    Pcpclaimsolutions
 * @subpackage Pcpclaimsolutions/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Pcpclaimsolutions
 * @subpackage Pcpclaimsolutions/includes
 * @author     PCP Claim Solutions <info@pcpclaimsolutions.com>
 */
class Pcpclaimsolutions_Activator {

    /**
     * Activates the plugin.
     *
     * This function is triggered when the plugin is activated. It creates the necessary database table.
     *
     * @since 1.0.0
     */
    public static function activate() {
        self::pcp_claim_create_db(); // Call the database creation function
    }

    /**
     * Creates the database table for storing claim entries.
     *
     * This method is called during the plugin activation to set up the database table.
     *
     * @since 1.0.0
     */
    public static function pcp_claim_create_db() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'pcp_claim_entries';
        $charset_collate = $wpdb->get_charset_collate();
    
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            first_name varchar(50) NOT NULL,
            last_name varchar(50) NOT NULL,
            phone_number varchar(20) DEFAULT '' NOT NULL,
            email_address varchar(100) NOT NULL,
            car_reg varchar(10) NOT NULL,
            car_make varchar(50) NOT NULL,
            car_model varchar(50) NOT NULL,
            car_year varchar(10) NOT NULL,
            car_fuel varchar(20) NOT NULL,
            car_colour varchar(20) NOT NULL,
            loan_type varchar(30) NOT NULL,
            finance_provider varchar(100) NOT NULL,
            other_finance_provider varchar(100) DEFAULT '' NOT NULL,
            car_cost varchar(30) NOT NULL,
            commission_aware varchar(10) NOT NULL,
            date_submitted datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";
    
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

// Register the activation hook
register_activation_hook(__FILE__, ['Pcpclaimsolutions_Activator', 'activate']);


