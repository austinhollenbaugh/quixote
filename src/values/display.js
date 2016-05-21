// Copyright (c) 2016 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var ensure = require("../util/ensure.js");
	var Value = require("./value.js");

	var DISPLAYED = "displayed";
	var NOT_DISPLAYED = "not displayed";
	var DISPLAY_NONE = "not displayed due to display:none property";
	var DETACHED = "not displayed due to being detached from DOM";

	var Me = module.exports = function Display(state) {
		ensure.signature(arguments, [ String ]);

		this._state = state;
	};
	Value.extend(Me);

	Me.displayed = function displayed() {
		return new Me(DISPLAYED);
	};

	Me.notDisplayed = function notDisplayed() {
		return new Me(NOT_DISPLAYED);
	};

	Me.displayNone = function displayNone() {
		return new Me(DISPLAY_NONE);
	};

	Me.detached = function displayNone() {
		return new Me(DETACHED);
	};

	Me.prototype.compatibility = function compatibility() {
		return [ Me ];
	};

	Me.prototype.diff = Value.safe(function diff(expected) {
		var thisState = this._state;
		var expectedState = expected._state;

		if (thisState === expectedState) return "";

		if (thisState === DISPLAYED) return "expected to be non-displayed";
		else if (expectedState === DISPLAYED) return "expected to be displayed";
		else if (thisState === NOT_DISPLAYED || expectedState === NOT_DISPLAYED) return "";
		else return "achieved differently than expected";
	});

	Me.prototype.toString = function toString() {
		return this._state;
	};

}());