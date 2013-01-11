var app = app || {};

$(function () {
    'use strict';

    // Time Block View
    // --------------

    // The DOM element for a time block
    app.TimeBlockView = Backbone.View.extend({

        //... is a list tag.
        tagName: 'dd',

        // Cache the template function for a single item.
        template: Handlebars.templates.item,

        // The DOM events specific to an item.
        events: {
            'click .toggle': 'togglecompleted',
            'dblclick .timeval-grp': 'edit',
            'click .destroy': 'clear',
            'keyup .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },

        // The TimeBlockView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **TimeBlock** and a **TimeBlockView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
            this.model.on('visible', this.toggleVisible, this);
        },

        // Re-render the titles of the time block item.
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('running', !this.model.get('completed'));
            this.$el.toggleClass('completed', this.model.get('completed'));

            this.toggleVisible();
            return this;
        },

        toggleVisible: function () {
            this.$el.toggleClass('hidden', this.isHidden());
        },

        isHidden: function () {
            var isCompleted = this.model.get('completed');
            return ( // hidden cases only
                (!isCompleted && app.TimeBlockFilter === 'completed')
                    || (isCompleted && app.TimeBlockFilter === 'active')
                );
        },

        // Toggle the `"completed"` state of the model.
        togglecompleted: function () {
            this.model.toggle();
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function (event) {
            var group = this.timevalGroup(event);
            if (group.el.hasClass('running')) {
                this.togglecompleted();
            }
            group.el.addClass('editing');
            group.input.val(group.label.text()).focus();
        },

        // Close the `"editing"` mode, saving changes to the time block.
        close: function (event) {
            var group = this.timevalGroup(event);
            var value = group.input.val().trim();
            if (value && event.which !== ESC_KEY) {
                this.model.setTimeVal(group.targetAttr, value);
            }
            group.el.removeClass('editing');
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (event) {
            if (event.which === ENTER_KEY || event.which === ESC_KEY) {
                this.close(event);
            }
        },

        // Takes an event as an argument, returns an object with info about the
        // associated group (i.e. start or stop)
        timevalGroup: function (event) {
            var $tgt = $(event.target);
            var $tvGrp = ($tgt.hasClass('timeval-grp')) ? $tgt : $tgt.parents('.timeval-grp');
            return {
                el: $tvGrp,
                label: $tvGrp.find('.timestamp'),
                input: $tvGrp.find('input'),
                targetAttr: $tvGrp.find('input').attr("data-target-attr")
            }
        },

        // Remove the item, destroy the model from *localStorage* and delete its view.
        clear: function () {
            var prevElIsDt = !!this.$el.prev()[0] ? this.$el.prev()[0].tagName == 'DT' : false;
            if (prevElIsDt) {
                this.$el.prev().remove();
            }

            this.model.destroy();
        }
    });
});
