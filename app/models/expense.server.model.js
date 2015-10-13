'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Expense Schema
 */
var ExpenseSchema = new Schema({

  expenseDate: Date,


  amount: Number,


  details: [{
  
  
  expenseType:{type: Schema.Types.ObjectId, ref: 'ExpenseType'},
  
  
  
  narration: String,
  
  
  
  amount: Number,
  
  
  }],

	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId, ref: 'User'}
});
mongoose.model('Expense', ExpenseSchema);