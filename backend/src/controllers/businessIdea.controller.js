import BusinessIdea from "../models/BussinessIdea.model.js";

export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await BusinessIdea.find()
      .populate("entrepreneurId", "name email phone location")
      .sort({ createdAt: -1 });

    res.status(200).json(ideas);
  } catch (error) {
    console.log("Error in getAllIdeas Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getIdeaById = async (req, res) => {
  try {
    const idea = await BusinessIdea.findById(req.params.id).populate(
      "entrepreneurId",
      "name email phone location"
    );

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.status(200).json(idea);
  } catch (error) {
    console.log("Error in getIdeaById Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createIdea = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      fundingRequired,
      expectedROI,
      pitchDeckUrl,
    } = req.body;

    if (!title || !category || !description || !fundingRequired) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (isNaN(fundingRequired)) {
      return res.status(400).json({ message: "Funding must be a number" });
    }

    const newIdea = new BusinessIdea({
      entrepreneurId: req.user._id,
      title,
      category,
      description,
      fundingRequired,
      expectedROI,
      pitchDeckUrl,
    });

    await newIdea.save();

    res.status(201).json({
      _id: newIdea._id,
      title: newIdea.title,
      category: newIdea.category,
      entrepreneurId: newIdea.entrepreneurId,
      status: newIdea.status,
      createdAt: newIdea.createdAt,
    });
  } catch (error) {
    console.log("Error in createIdea Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateIdea = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      fundingRequired,
      expectedROI,
      pitchDeckUrl,
      status,
    } = req.body;
    const ideaId = req.params.id;

    const idea = await BusinessIdea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    if (idea.entrepreneurId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this idea" });
    }

    idea.title = title || idea.title;
    idea.category = category || idea.category;
    idea.description = description || idea.description;
    idea.fundingRequired = fundingRequired || idea.fundingRequired;
    idea.expectedROI = expectedROI || idea.expectedROI;
    idea.pitchDeckUrl = pitchDeckUrl || idea.pitchDeckUrl;
    idea.status = status || idea.status;

    const updatedIdea = await idea.save();

    res.status(200).json({
      _id: updatedIdea._id,
      title: updatedIdea.title,
      category: updatedIdea.category,
      status: updatedIdea.status,
      updatedAt: updatedIdea.updatedAt,
    });
  } catch (error) {
    console.log("Error in updateIdea Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIdea = async (req, res) => {
  try {
    const idea = await BusinessIdea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    if (idea.entrepreneurId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this idea" });
    }

    await BusinessIdea.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Idea deleted successfully" });
  } catch (error) {
    console.log("Error in deleteIdea Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
