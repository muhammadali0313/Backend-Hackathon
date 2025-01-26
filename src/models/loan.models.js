import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: Number,
    required: true,
  },
  monthlyPayment: {
    type: Number,
    required: true,
  },
  totalRepayment: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Loan", loanSchema);
