import LoanOffer from "../models/LoanOffer.model.js";

export const getOffers = async (req, res) => {
  try {
    const {
      loanType,
      interestRate,
      maxAmount,
      bankerId,
      minAmount,
      eligibility,
      createdAtStart,
      createdAtEnd,
      sortBy = "createdAt",
      sortOrder = "desc",
      limit,
      page = 1,
    } = req.query;

    const query = {};

    if (loanType) {
      query.loanType = { $regex: loanType, $options: "i" };
    }

    if (interestRate) {
      query.interestRate = interestRate;
    }

    if (maxAmount) {
      query.maxAmount = { $lte: Number(maxAmount) };
    }

    if (minAmount) {
      query.maxAmount = query.maxAmount || {};
      query.maxAmount.$gte = Number(minAmount);
    }

    if (bankerId) {
      query.bankerId = bankerId;
    }

    if (eligibility) {
      query.eligibility = { $regex: eligibility, $options: "i" };
    }

    if (createdAtStart || createdAtEnd) {
      query.createdAt = {};
      if (createdAtStart) {
        query.createdAt.$gte = new Date(createdAtStart);
      }
      if (createdAtEnd) {
        query.createdAt.$lte = new Date(createdAtEnd);
      }
    }

    const options = {
      sort: { [sortBy]: sortOrder === "desc" ? -1 : 1 },
      populate: "bankerId",
      lean: true,
    };

    if (limit) {
      options.limit = parseInt(limit);
      options.skip = (parseInt(page) - 1) * parseInt(limit);
    }
    const [offers, total] = await Promise.all([
      LoanOffer.find(query, null, options).populate(
        "bankerId",
        "name email phone location"
      ),
      LoanOffer.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: offers.length,
      total,
      page: parseInt(page),
      pages: limit ? Math.ceil(total / parseInt(limit)) : 1,
      data: offers,
    });
  } catch (error) {
    console.error("Error in getOffers Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const offer = await LoanOffer.findById(req.params.id).populate(
      "bankerId",
      "name email phone location"
    );

    if (!offer) {
      return res.status(404).json({ message: "Loan offer not found" });
    }

    res.status(200).json(offer);
  } catch (error) {
    console.error("Error in getOfferById Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createOffer = async (req, res) => {
  try {
    const { loanType, interestRate, maxAmount, eligibility, description } =
      req.body;

    if (!loanType || !interestRate) {
      return res
        .status(400)
        .json({ message: "Loan type and interest rate are required" });
    }

    if (!/^[\d.]+%?$/.test(interestRate)) {
      return res.status(400).json({ message: "Invalid interest rate format" });
    }

    const newOffer = new LoanOffer({
      bankerId: req.user._id,
      loanType,
      interestRate,
      maxAmount: maxAmount ? Number(maxAmount) : undefined,
      eligibility,
      description,
    });

    await newOffer.save();

    res.status(201).json({
      _id: newOffer._id,
      loanType: newOffer.loanType,
      interestRate: newOffer.interestRate,
      bankerId: newOffer.bankerId,
      createdAt: newOffer.createdAt,
    });
  } catch (error) {
    console.error("Error in createOffer Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { loanType, interestRate, maxAmount, eligibility, description } =
      req.body;
    const offerId = req.params.id;

    const offer = await LoanOffer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Loan offer not found" });
    }

    if (offer.bankerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this offer" });
    }

    if (interestRate && !/^[\d.]+%?$/.test(interestRate)) {
      return res.status(400).json({ message: "Invalid interest rate format" });
    }

    offer.loanType = loanType || offer.loanType;
    offer.interestRate = interestRate || offer.interestRate;
    offer.maxAmount = maxAmount ? Number(maxAmount) : offer.maxAmount;
    offer.eligibility = eligibility || offer.eligibility;
    offer.description = description || offer.description;

    const updatedOffer = await offer.save();

    res.status(200).json({
      _id: updatedOffer._id,
      loanType: updatedOffer.loanType,
      interestRate: updatedOffer.interestRate,
      updatedAt: updatedOffer.updatedAt,
    });
  } catch (error) {
    console.error("Error in updateOffer Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const offer = await LoanOffer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Loan offer not found" });
    }

    if (offer.bankerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this offer" });
    }

    await LoanOffer.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Loan offer deleted successfully" });
  } catch (error) {
    console.error("Error in deleteOffer Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
