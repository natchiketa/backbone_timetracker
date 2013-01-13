var app = app || {};

(function() {
	'use strict';

	// Time Block Model
	// ----------

	// A model for a single block of time with start and stop datetimes.
	app.TimeBlock = Backbone.Model.extend({

		// Default attributes for the time block
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
        },

        // Use the formatted timestamp string (e.g. "6:14:40 pm") to update the value for this.start or this.stop
        setTimeVal: function(targetAttr, timeVal) {
            var saveObj = {};
            var shortDate = Date.create(this.get(targetAttr)).short();
            saveObj[targetAttr] = Date.create( shortDate + ' ' + timeVal);
            this.save(saveObj);
        }

	});

}());
