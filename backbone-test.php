<?php
/**
 * Plugin Name: Backbone Test
 * Plugin URI: http://genbumedia.com/plugins/{SLUG}/
 * Description: {SHORT DESCRIPTION}
 * Version: 1.0.0
 * Author: David Chandra Purnama
 * Author URI: http://shellcreeper.com/
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: {PLUGIN FOLDER NAME}
 * Domain Path: /languages/
**/


/* Constants
------------------------------------------ */

$prefix = 'BBT';
define( $prefix . '_URI', trailingslashit( plugin_dir_url( __FILE__ ) ) );
define( $prefix . '_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( $prefix . '_FILE', __FILE__ );
define( $prefix . '_PLUGIN', plugin_basename( __FILE__ ) );
define( $prefix . '_VERSION', '1.0.0' );

/* Init
------------------------------------------ */

add_action( 'plugins_loaded', function() {

	// Register Settings.
	add_action( 'admin_init', function() {
		register_setting(
			$option_group      = 'bbtest',
			$option_name       = 'bbtest',
			$sanitize_callback = function( $in ) {
				return $in;
			}
		);
	} );

	// Add Settings Page.
	add_action( 'admin_menu', function() {

		// Add page.
		$page = add_menu_page(
			$page_title  = 'Backbone Test',
			$menu_title  = 'Backbone Test',
			$capability  = 'manage_options',
			$menu_slug   = 'bbtest',
			$function    = function() {
				?>
				<div class="wrap">
					<h1>Backbone Test</h1>
					<form method="post" action="options.php">
						<?php settings_errors(); ?>
						<?php require_once( BBT_PATH . 'test/html.php' ); ?>
						<?php do_settings_sections( 'bbtest' ); ?>
						<?php settings_fields( 'bbtest' ); ?>
						<?php submit_button(); ?>
					</form>
				</div><!-- wrap -->
				<?php
			}
		);

		// Load assets.
		add_action( 'admin_enqueue_scripts', function( $hook_suffix ) use( $page ) {
			if ( $page === $hook_suffix ) {
				wp_enqueue_style( 'bbtest_settings', BBT_URI . 'test/style.css', array(), BBT_VERSION );
				wp_enqueue_script( 'bbtest_settings', BBT_URI . 'test/script.js', array( 'jquery', 'backbone', 'jquery-ui-sortable', 'wp-util' ), BBT_VERSION, true );
				$option = get_option( 'bbtest' );
				$option = is_array( $option ) ? $option : array();
				wp_localize_script( 'bbtest_settings', 'bbPersons', $option );
			}
		} );
	} );

} );

