import InvestorProposal from '../models/InvestorProposal.model.js';

export const getProposals = async (req, res) => {
  try {
    const proposals = await InvestorProposal.find()
      .populate("investorId", "name email phone location")
      .sort({ createdAt: -1 });

    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error in getProposals Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProposalById = async (req, res) => {
  try {
    const proposal = await InvestorProposal.findById(req.params.id)
      .populate("investorId", "name email phone location");

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json(proposal);
  } catch (error) {
    console.error("Error in getProposalById Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProposal = async (req, res) => {
  try {
    const { 
      sectorsOfInterest, 
      investmentRange, 
      expectedROI, 
      investmentHorizon, 
      proposalNote 
    } = req.body;

    if (!sectorsOfInterest || sectorsOfInterest.length === 0) {
      return res.status(400).json({ message: "At least one sector of interest is required" });
    }

    if (!investmentRange || !investmentRange.min || !investmentRange.max) {
      return res.status(400).json({ message: "Investment range with min and max values is required" });
    }

    const newProposal = new InvestorProposal({
      investorId: req.user._id,
      sectorsOfInterest,
      investmentRange: {
        min: Number(investmentRange.min),
        max: Number(investmentRange.max)
      },
      expectedROI,
      investmentHorizon,
      proposalNote
    });

    await newProposal.save();

    res.status(201).json({
      _id: newProposal._id,
      investorId: newProposal.investorId,
      sectorsOfInterest: newProposal.sectorsOfInterest,
      investmentRange: newProposal.investmentRange,
      createdAt: newProposal.createdAt
    });
  } catch (error) {
    console.error("Error in createProposal Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProposal = async (req, res) => {
  try {
    const { 
      sectorsOfInterest, 
      investmentRange, 
      expectedROI, 
      investmentHorizon, 
      proposalNote 
    } = req.body;

    const proposal = await InvestorProposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (proposal.investorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to update this proposal" });
    }

    if (investmentRange && (isNaN(investmentRange.min) || isNaN(investmentRange.max))) {
      return res.status(400).json({ message: "Investment range must contain valid numbers" });
    }

    proposal.sectorsOfInterest = sectorsOfInterest || proposal.sectorsOfInterest;
    proposal.investmentRange = {
      min: investmentRange?.min || proposal.investmentRange.min,
      max: investmentRange?.max || proposal.investmentRange.max
    };
    proposal.expectedROI = expectedROI || proposal.expectedROI;
    proposal.investmentHorizon = investmentHorizon || proposal.investmentHorizon;
    proposal.proposalNote = proposalNote || proposal.proposalNote;

    const updatedProposal = await proposal.save();

    res.status(200).json({
      _id: updatedProposal._id,
      sectorsOfInterest: updatedProposal.sectorsOfInterest,
      investmentRange: updatedProposal.investmentRange,
      updatedAt: updatedProposal.updatedAt
    });
  } catch (error) {
    console.error("Error in updateProposal Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProposal = async (req, res) => {
  try {
    const proposal = await InvestorProposal.findById(req.params.id);
    
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (proposal.investorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this proposal" });
    }

    await InvestorProposal.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Proposal deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProposal Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};