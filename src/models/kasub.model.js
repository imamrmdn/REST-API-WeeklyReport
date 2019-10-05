"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kasubSchema = new Schema({
  kasub: {
    type: String,
    required: true
  },
  kegiatan: {
    type: String,
    required: true
  },
  mitra: {
    type: String,
    required: true
  },
  tim_teknis: {
    type: String,
    required: true
  },
  nilai: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  keterangan: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now()
  }
});

const Kasub = mongoose.model("Kasub", userSchema);

module.exports = Kasub;
