var app = app || {};

(function() {
	'use strict';

	// Time Block Model
	// ----------

	// A model for a single block of time with start and stop datetimes.
	app.TimeBlock = Backbone.Model.extend({

		// Default attributes for the time block
		// and ensure that each time block created has a title and a start time.
		defaults: {
			title: '',
            round: "nearest 15 minutes",
			completed: false
		},

        initialize: function() {

        },

		// Toggle the `completed` state of this time block
		toggle: function() {
			this.save({
				completed: !this.get('completed')
			});
		},

        // Stop the time block
        stopclock: function() {
            this.save({
                stop: Date.create().format(Date.ISO8601_DATETIME),
                completed: true
            });
        }

	});

}());
