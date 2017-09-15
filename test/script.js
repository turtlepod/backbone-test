(function( window, undefined ){

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
			//'click #add-person': 'addOne',
			'click .remove-person': 'removeOne',
		},

		// The Contructor of this view.
		initialize: function() {

			// If the model change, render the DOM.
			//this.listenTo( this.model, 'change', this.render );
			this.listenTo( this.collection, 'add', this.addOne );
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
		},

		// Add single person.
		addOne: function( model ) {
			this.$el.append( this.template( model.toJSON() ) );
		},

		// Remove single person.
		removeOne: function( e ) {
			
		},

	} );

	// Load the collection to the view.s
	var myView = new PersonsView( {
		collection: new Persons(),
	} );

	// Load the data to this object.
	myView.collection.add( bbPersons );

})( window );

