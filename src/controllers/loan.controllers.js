import Loan from "../models/loan.models.js"
c
const registerLoan = async (req, res) => {
  const { fullName, cnic, phone, loanAmount, timePeriod, monthlyPayment, totalRepayment } = req.body;

  try {
   
    const existingLoan = await Loan.findOne({ cnic });
    if (existingLoan) {
      return res.status(400).json({ message: "Loan application already exists for this CNIC." });
    }

   
    const loan = new Loan({
      fullName,
      cnic,
      phone,
      loanAmount,
      timePeriod,
      monthlyPayment,
      totalRepayment,
    });

    await loan.save();

    res.status(201).json({ message: "Loan application submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default registerLoan
