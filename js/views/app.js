var app = app || {};

$(function( $ ) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#timetrackerapp',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: Handlebars.templates.stats,

        // Template for the Date heading preceding a group of date blocks with the same date.
        dateGroupTemplate: Handlebars.templates.dategroup,

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #new-timeblock': 'createOrStop',
            'keyup .new-time-string': 'createOrStop',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'stopAllBlocks',
            'click #rounding>.btn': 'updateRounding'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function() {

			this.input = this.$('#new-timeblock');
            this.timeOpts = this.$('.new-time-string');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

            $(window).on('keyup', function(event) {
                app.AppView.prototype.focusTimeOpts.call(app.AppView, event)
            });


            app.TimeBlocks.on( 'add', this.addOne, this );
			app.TimeBlocks.on( 'reset', this.addAll, this );
			app.TimeBlocks.on( 'change:completed', this.filterOne, this );
            app.TimeBlocks.on( 'filter', this.filterAll, this );
            app.TimeBlocks.on( 'all', this.render, this );
            app.TimeBlocks.on( 'all', this.updateClockBtnText, this );

			app.TimeBlocks.fetch();

            this.renderStats();

            // Using MiniDaemon since setInterval does not pass the model as `this` to
            // the callback.
            // See https://developer.mozilla.org/en-US/docs/DOM/window.setInterval#The_.22this.22_problem
            var runningTimeUpdate = new MiniDaemon(this, this.updateStopTime, Infinity, 1000);
            runningTimeUpdate.start();

		},

        remove: function() {
            $(window).off('keyup')
        },

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {


		},

        renderStats: function() {
            var completed = app.TimeBlocks.completed().length;
            var remaining = app.TimeBlocks.remaining().length;

            if ( app.TimeBlocks.length ) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));

                this.$footer.find('#rounding .btn[data-roundamt="' + app.TimeBlocks.getRounding() + '"]')
                    .addClass('active');

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + ( app.TimeBlockFilter || '' ) + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }
        },

        updateRounding: function(event) {
            event.preventDefault();
            var rndVal = $(event.target).data('roundamt');
            app.TimeBlocks.setRounding(rndVal);
            app.TimeBlocks.trigger('reset');
        },

		// Add a single time block to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( timeblock ) {
			var view = new app.TimeBlockView({ model: timeblock });
            if ( !app.TimeBlocks.sameDayAsLast( timeblock.get('order') ) ) {
                $('#timeblock-list').append( this.dateGroupTemplate({
                    date: timeblock.get('start')
                }));
            }
			$('#timeblock-list').append( view.render().el );
		},

		// Add all items in the **TimeBlocks** collection at once.
		addAll: function() {
			this.$('#timeblock-list').html('');
			app.TimeBlocks.each(this.addOne, this);
		},

		filterOne : function (timeblock) {
			timeblock.trigger('visible');
		},

		filterAll : function () {
			app.TimeBlocks.each(this.filterOne, this);
		},

		// Generate the attributes for a new Time Block item.
		newAttributes: function() {
            var newDateOpts = !!(Date.create(this.timeOpts.val()) != 'Invalid Date') ? this.timeOpts.val() : '';
            if (!!newDateOpts) this.timeOpts.val('');
			return {
				order: app.TimeBlocks.nextOrder(),
                start: Date.create(newDateOpts).format(Date.ISO8601_DATETIME),
                stop: Date.create(newDateOpts).format(Date.ISO8601_DATETIME),
                description: "",
                completed: !!newDateOpts
			};
		},

        updateClockBtnText: function() {
            this.input.text(!!app.TimeBlocks.running().length ? 'Stop the clock' : 'Start a new time block');
        },

		// If you hit return in the main input field, create new **TimeBlock** model,
		// persisting it to *localStorage*.
        createOrStop: function( e ) {

            if ($(e.target).hasClass('new-time-string') && e.which != ENTER_KEY) {
                return
            }

            if (!!app.TimeBlocks.running().length) {
                app.TimeBlocks.last().stopclock();
            } else {
                app.TimeBlocks.create(this.newAttributes());
            }
		},

        focusTimeOpts: function(event) {
            if (event.which == 	'78' && event.ctrlKey) {
                $('.new-time-string').trigger('focus')
            }
        },

		// Clear all completed time block items, destroying their models.
		clearCompleted: function() {
			_.each( app.TimeBlocks.completed(), function( timeblock ) {
				timeblock.destroy();
			});

			return false;
		},

        stopAllBlocks: function() {
			var completed = this.allCheckbox.checked;

			app.TimeBlocks.each(function( todo ) {
				todo.save({
					'completed': completed
				});
			});
		},

        updateStopTime: function() {

            _.each( app.TimeBlocks.running(), function( timeblock ) {
                timeblock.save({
                    stop: Date.create().format(Date.ISO8601_DATETIME)
                });
            });

        }

	});
});
