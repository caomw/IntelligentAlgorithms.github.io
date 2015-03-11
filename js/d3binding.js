// a custom binding
var d3binding = function() {
    'use strict';
    // element to each object (diffeent d3-objects)
    this.connections = [];
    this.duration = 750;
    this.ease = "linear";
    // connects a binding to each attribut "property_" of "element" modified by "func"
    this.connect = function(element_, property_, function_) {
        this.connections.push({
            element: element_,
            property: property_,
            func: function_
        });
    }
    // the value
    this.currentValue = null;
    this.value = function() {
        return this.currentValue;
    }
    // on value changes
    this.animate = function(x) {
        // update the value itself
        this.currentValue = x;
        var parent = this;
        d3.transition()
            .duration(parent.duration)
            .ease(parent.ease)
            .each(function() {
                // update each binded-object
                for (var i = 0; i < parent.connections.length; i++) {
                    var bindObject = parent.connections[i];

                    var modifier = function(x) {
                        return x;
                    };
                    if (typeof bindObject.func !== "undefined") {
                        modifier = bindObject.func;
                    }
                    var to = modifier(x);
                    var attrName = bindObject.property;

                    bindObject.element
                        .transition()
                        .attr(attrName, to);
                }
            });
    };
    // on value changes
    this.jump = function(x) {
        // update the value itself
        this.currentValue = x;
        var parent = this;

        // update each binded-object
        for (var i = 0; i < parent.connections.length; i++) {
            var bindObject = parent.connections[i];

            var modifier = function(x) {
                return x;
            };
            if (typeof bindObject.func !== "undefined") {
                modifier = bindObject.func;
            }
            var to = modifier(x);
            var attrName = bindObject.property;

            bindObject.element.attr(attrName, to);
        }
    };
}