import Advice from "../models/advice.model.js";

export const getAdviceList = async (req, res) => {
  try {
    const {
      category,
      advisorId,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
    } = req.query;

    const query = {};

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (advisorId) {
      query.advisorId = advisorId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const adviceList = await Advice.find(query)
      .populate("advisorId", "name email")
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 });

    res.status(200).json({
      success: true,
      count: adviceList.length,
      data: adviceList,
    });
  } catch (error) {
    console.error("Error in getAdviceList Controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAdviceById = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id).populate(
      "advisorId",
      "name email location"
    );

    if (!advice) {
      return res.status(404).json({
        success: false,
        message: "Advice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: advice,
    });
  } catch (error) {
    console.error("Error in getAdviceById Controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const postAdvice = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const newAdvice = new Advice({
      advisorId: req.user._id,
      title,
      content,
      category,
    });

    await newAdvice.save();

    res.status(201).json({
      success: true,
      data: {
        _id: newAdvice._id,
        title: newAdvice.title,
        category: newAdvice.category,
        advisorId: newAdvice.advisorId,
        createdAt: newAdvice.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in postAdvice Controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateAdvice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const adviceId = req.params.id;

    const advice = await Advice.findById(adviceId);
    if (!advice) {
      return res.status(404).json({
        success: false,
        message: "Advice not found",
      });
    }

    if (advice.advisorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this advice",
      });
    }

    advice.title = title || advice.title;
    advice.content = content || advice.content;
    advice.category = category || advice.category;

    const updatedAdvice = await advice.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedAdvice._id,
        title: updatedAdvice.title,
        updatedAt: updatedAdvice.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error in updateAdvice Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteAdvice = async (req, res) => {
  try {
    const advice = await Advice.findById(req.params.id);
    if (!advice) {
      return res
        .status(404)
        .json({ success: false, message: "Advice not found" });
    }
    if (advice.advisorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    await Advice.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Advice deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
