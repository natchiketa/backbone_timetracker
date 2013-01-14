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
            round: 15,
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

        // Calculate the duration of the timeblock, return as number of hours (e.g. if
        // start time was 12:00 pm and stop time was 2:30 pm, will return 2.5). The round
        // attribute is used, so a range of 1 hour and 40 minutes would return 1.666 if
        // round == 1, 1.75 if round == 15, or 1.5 if round == 30.
        totalhrs: function(rounded) {
            rounded = (typeof rounded == 'undefined') ? true : rounded;
            var range = this.blockRange();
            var totalMins = range.stop.minutesSince(range.start);
            var rndAmt = app.TimeBlocks.getRounding();
            return rounded? ((totalMins / rndAmt).round() * (rndAmt / 60)) : (totalMins / 60);
        },

        blockRange: function() {
            return {
                start: Date.create(this.get('start')),
                stop: Date.create(this.get('stop'))
            }
        },

        // Use the formatted timestamp string (e.g. "6:14:40 pm") to update the value for this.start or this.stop
        setTimeVal: function(targetAttr, timeVal) {
            var saveObj = {};
            var shortDate = Date.create(this.get(targetAttr)).short();
            saveObj[targetAttr] = Date.create( shortDate + ' ' + timeVal).format(Date.ISO8601_DATETIME);
            this.save(saveObj);
        }

	});

}());
