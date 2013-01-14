var app = app || {};

(function() {
	'use strict';

	// Time Block Collection
	// ---------------

	// The collection of time blocks is backed by *localStorage* instead of a remote
	// server.
	var TimeBlockList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: app.TimeBlock,

		// Save all of the time block items under the `"TimeBlock"` namespace.
		localStorage: new Store('timetracker-backbone'),

		// Filter down the list of all time block items that are completed.
		completed: function() {
			return this.filter(function( timeblock ) {
				return timeblock.get('completed');
			});
		},

		// List of time block items filtered by `dateStr` which is any valid argument for the
		// SugarJS create() method. The values for the start/stop attributes can be used as-
		// is. See http://sugarjs.com/dates for more options.
	    forDate: function(dateStr) {
			return this.filter(function( timeblock ) {
                var day = Date.create(dateStr).short();
				return Date.create(timeblock.get('start')).is(day);
			});
		},

        //TODO: Is it okay to store rounding option without circumventing sync adapter?
        getRounding: function() {
            return !!localStorage['roundingVal'] ? localStorage['roundingVal'] : localStorage['roundingVal'] = 1;
        },

        setRounding: function(rndVal) {
            return localStorage['roundingVal'] = rndVal;
        },

		// Filter down the list of all time block items that are still running.
		running: function() {
			return this.without.apply( this, this.completed() );
		},

        //TODO: Refactor to use more semantically correct function above.
		// Filter down the list to only time block items that are still running.
		remaining: function() {
			return this.without.apply( this, this.completed() );
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

        blockAtPosition: function( order ) {
            try {
                return this.filter(function (tb) {
                    return tb.get('order') == order
                })[0];
            } catch (e) {
                return false;
            }
        },

        // Compares the start date of the time block the matching the `order` argument
        // with that of the previous one, returning `true` if they both start on the
        // same day. If the matching block and/or the previous block don't exist, it
        // returns `false`.
        sameDayAsLast: function(order) {
            if (this.blockAtPosition(order) && this.blockAtPosition(order - 1)) {
                var thisBlockDate = Date.create(this.blockAtPosition(order).get('start')).format("{Dow} {Mon} {ord}");
                return Date.create(this.blockAtPosition(order - 1).get('start')).is(thisBlockDate);
            } else {
                return false;
            }
        },

        // Uses above function to compare to date of next block
        sameDayAsNext: function(order) {
            return this.sameDayAsLast(order + 1);
        },

		// Todos are sorted by their original insertion order.
		comparator: function( timeblock ) {
			return Date.create(timeblock.get('start')).getTime();
		}

	});

	// Create our global collection of **TimeBlocks**.
	app.TimeBlocks = new TimeBlockList();

}());
