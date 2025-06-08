import Query from "../models/query.model.js";
export const getQueries = async (req, res) => {
  try {
    const { status, entrepreneurId, advisorId, answeredBy, search } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (entrepreneurId) {
      query.entrepreneurId = entrepreneurId;
    }

    if (advisorId) {
      query.advisorId = advisorId;
    }

    if (answeredBy) {
      query.advisorId = answeredBy;
      query.status = "answered";
    }

    if (search) {
      query.question = { $regex: search, $options: "i" };
    }

    const queries = await Query.find(query)
      .populate("entrepreneurId", "name email")
      .populate("advisorId", "name email specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: queries.length,
      data: queries,
    });
  } catch (error) {
    console.error("Error in getQueries Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id)
      .populate("entrepreneurId", "name email phone")
      .populate("advisorId", "name email specialization");

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    res.status(200).json({
      success: true,
      data: query,
    });
  } catch (error) {
    console.error("Error in getQueryById Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const postQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const newQuery = new Query({
      entrepreneurId: req.user._id,
      question,
    });

    await newQuery.save();

    res.status(201).json({
      success: true,
      data: {
        _id: newQuery._id,
        question: newQuery.question,
        status: newQuery.status,
        createdAt: newQuery.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in postQuery Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const postSolution = async (req, res) => {
  try {
    const { answer } = req.body;
    const queryId = req.params.id;

    const query = await Query.findById(queryId);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    if (query.status === "answered") {
      return res.status(400).json({
        success: false,
        message: "Query already answered",
      });
    }

    query.advisorId = req.user._id;
    query.answer = answer;
    query.status = "answered";

    const updatedQuery = await query.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedQuery._id,
        status: updatedQuery.status,
        answeredBy: updatedQuery.advisorId,
        updatedAt: updatedQuery.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error in postSolution Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
