var app = app || {};

(function() {
	'use strict';

	// Time Block Router
	// ----------

	var Workspace = Backbone.Router.extend({
		routes:{
			'*filter': 'setFilter'
		},

		setFilter: function( param ) {
			// Set the current filter to be used
			app.TimeBlockFilter = param.trim() || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Time Block view items
			app.TimeBlocks.trigger('filter');
		}
	});

	app.TimeBlockRouter = new Workspace();
	Backbone.history.start();

}());
