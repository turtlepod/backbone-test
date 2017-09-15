jQuery( document ).ready( function($) {

	// #tmpl-bbt-li
	var personTemplate = wp.template( 'bbt-li' );

	// On page load.
	_.each( bbPersons, function( data ) {
		$( '#persons' ).append( personTemplate( data ) );
	});

	// Enter click.
	$( '#add-person-fields' ).bind( 'keypress', function(e){
		if ( e.keyCode == 13 ){
			e.preventDefault();
			$( '#add-person' ).trigger( 'click' );
			return false;
		}
	});

	// Add person.
	$( document ).on( 'click', '#add-person', function(e) {

		// Add in DOM.
		$( '#persons' ).append( personTemplate( {
			name : $( '#name-input' ).val(),
			url  : $( '#url-input' ).val(),
		} ) );

		// Clear fields.
		$( '#name-input' ).val( '' );
		$( '#url-input' ).val( '' );

		// Refocus
		$( '#name-input' ).focus();
	} );

	// Remove Person.
	$( document ).on( 'click', '.remove-person', function() {
		$( this ).parent( 'li' ).remove();
	} );

} );