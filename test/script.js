
window.wp = window.wp || {};
var document = window.document;
var $ = window.jQuery;

/**
 * This is the data model for a single person.
 * Basically a reusuable object.
 */
var Person = Backbone.Model.extend( {
	// The "defaults" is a defined methods in the backbone lib.
	defaults: {
		name: 'Person Name',
		url: '',
	},
} );

/**
 * Collection of the model.
 * Basically group of model.
 */
var Persons = Backbone.Collection.extend( {
	model: Person,
} );

/**
 * View of the collection.
 * This is the one that will render to the DOM.
 * So, this class the only one interacting to the DOM and Elements.
 * The idea, is that you can even have multiple "views" using the same model/collection.
 */
var PersonsView = Backbone.View.extend( {

	// This View DOM.
	el: '#persons',

	// Underscore template to use.
	// This is a custom methods.
	template: wp.template( 'bbt-li' ),

	// Event listener for this view.
	events: {
		'click .remove-person': 'removeOne',
	},

	// The Contructor of this view.
	initialize: function() {
		//this.listenTo( this.collection, 'change', this.render, this );
		this.listenTo( this.collection, 'add', this.render, this );
	},

	// Render the Elements.
	render : function() {
		var self = this;

		// Clear out list.
		this.$el.html( '' );

		// Add items again.
		this.collection.each( function( model ) {
			self.addOne( model );
		} );

		return this;
	},

	// Add single person.
	addOne: function( model ) {
		this.$el.append( this.template( model.toJSON() ) );
	},

	// Remove single person.
	removeOne: function( e ) {
		
	},

} );

/* ================================================= */

// Load the collection to the view.
var personView = new PersonsView( {
	collection: new Persons(),
} );

// Load the data to this object.
personView.collection.add( bbPersons );

/* ================================================= */
/* OLD */
/* ================================================= */

var personTemplate = wp.template( 'bbt-li' );

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


