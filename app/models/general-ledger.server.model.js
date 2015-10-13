'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GeneralLedger Schema
 */
var GeneralLedgerSchema = new Schema({

  name: String,


  description: String,

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('GeneralLedger', GeneralLedgerSchema);