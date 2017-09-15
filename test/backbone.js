/**
 * Speakers.
 *
 * @since 1.0.0
 */
( function( window, undefined ) {

	window.wp = window.wp || {};
	var wp = window.wp;
	var $ = window.jQuery;

	/**
	 * Manage Backbone API for Speakers.
	 *
	 * @since 1.0.0
	 */
	var api = {
		Models: {},
		Views: {},
		Collections: {}
	};

	/**
	 * A single speaker.
	 *
	 * @since 1.0.0
	 */
	api.Models.Speaker = Backbone.Model.extend( {
		defaults: {
			name: null,
			url: null,
		},
		validate: function( attrs ) {
			if ( ! attrs.name ) {
				return 'Name field is required!';
			}
		},
	} );

	/**
	 * Manage a collection of speakers.
	 *
	 * @since 1.0.0
	 * @uses api.Models.Speaker
	 */
	api.Collections.Speakers = Backbone.Collection.extend( {
		model: api.Models.Speaker,
	} );

	/**
	 * A single item.
	 * This is a generic item, we can extend this object to speakers or other view.
	 * example in api.Views.Speaker below, using "bbt-li" wp.template.
	 *
	 * @since 1.0.0
	 */
	api.Views.Item = Backbone.View.extend({
		tagName: 'li',
		attributes: function() {
			return {
				'data-cid': this.model.cid,
			};
		},

		/**
		 * Handle events.
		 *
		 * @since 1.0.0
		 */
		events: {
			// Add a new speaker button.
			'click .remove-person': 'removeOne',
		},

		/**
		 * Output a single speaker.
		 *
		 * @since 1.0.0
		 */
		render: function() {
			// Add the unique model ID to the JSON.
			var data = _.extend( {}, this.model.toJSON(), { cid: this.model.cid } );

			this.$el.append( this.template( data ) );

			return this;
		},

		/**
		 * Remove a speaker from the list.
		 *
		 * Since the values are only saved based on the inputs present
		 * in the DOM all we technically need to do is remove the row.
		 * But we will clear the item from the collection too.
		 *
		 * Click events do not contain information about the current model so we need
		 * to find it again in the collection.
		 *
		 * @since 1.0.0
		 */
		removeOne: function( e ) {
			e.preventDefault(); // Possibly warn.

			var id = $(e.currentTarget).data( 'cid' );

			api.Speakers.remove( id ).destroy();
		}
	});

	/**
	 * A single speaker.
	 * This extending api.Views.Item views.
	 *
	 * @since 1.0.0
	 */
	api.Views.Speaker = api.Views.Item.extend({
		className: 'speaker',
		template: wp.template( 'bbt-li' ),
	});

	/**
	 * View a list of speakers.
	 *
	 * @since 1.0.0
	 */
	api.Views.Speakers = wp.Backbone.View.extend({
		el: '#persons',

		/**
		 * Initialize.
		 *
		 * @since 1.0.0
		 */
		initialize: function() {
			this.listenTo( this.collection, 'add', this.addOne );
			this.listenTo( this.collection, 'remove', this.removeOne );
		},

		/**
		 * Add a single speaker to the list.
		 *
		 * @since 1.0.0
		 */
		addOne: function( speaker ) {
			var view = new api.Views.Speaker( {
				model: speaker,
			} );

			// Check if model valid.
			if ( ! view.model.isValid() ) {
				alert( view.model.validationError );
				return;
			}

			this.views.add( view );
		},

		/**
		 * Remove a speaker from the list.
		 *
		 * @since 1.0.0
		 */
		removeOne: function( speaker ) {
			$( '.speaker[data-cid=' + speaker.cid + ']' ).remove();
		}
	});

	/**
	 * Add a new speaker.
	 *
	 * @since 1.0.0
	 */
	api.Views.NewSpeaker = wp.Backbone.View.extend({
		el: '#add-person-fields',

		/**
		 * Handle events.
		 *
		 * @since 1.0.0
		 */
		events: {
			// Add a new speaker button.
			'click #add-person': 'addSpeaker',

			// Deal with Enter key here.
			'keypress': 'keyPressCheck',
		},

		/**
		 * Constructor.
		 */
		initialize: function() {
			
		},

		/**
		 * Key Press Check
		 */
		keyPressCheck: function(e) {
			if ( e.keyCode == 13 ){
				e.preventDefault();
				this.addSpeaker();
				return false;
			}
		},

		/**
		 * Add a new speaker with filled in information.
		 *
		 * @since 1.0.0
		 */
		addSpeaker: function() {
			var data = {
				name: this.$el.find( '#name-input' ).val(),
				url: this.$el.find( '#url-input' ).val()
			}

			// Add to collection.
			api.Speakers.add( data );

			// Reset.
			this.$el.find( '#name-input' ).val( '' ).focus();
			this.$el.find( '#url-input' ).val( '' );
		}
	});

	/**
	 * Manager
	 *
	 * @since 1.0.0
	 */
	api.Views.SpeakerManager = wp.Backbone.View.extend({
		el: '#speakers',

		/**
		 * @since 1.0.0
		 */
		initialize: function() {
			// Create a collection of speakers.
			api.Speakers = new api.Collections.Speakers();

			// Add subviews (speaker list and new form).
			this.views.add( 
				new api.Views.Speakers({
					collection: api.Speakers
				}),
				new api.Views.NewSpeaker({
					collection: api.Speakers
				}) 
			);

			// Add bootstrapped speakers
			api.Speakers.add( bbPersons );
		}
	});

	new api.Views.SpeakerManager();

}( window ) );
