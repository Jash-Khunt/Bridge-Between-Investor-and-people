import ConnectionRequest from "../models/connection.model.js";
import BusinessIdea from "../models/BussinessIdea.model.js";

export const requestConnection = async (req, res) => {
  try {
    const { businessIdeaId, message } = req.body;
    if (!businessIdeaId) {
      return res.status(400).json({ message: "Business idea ID is required" });
    }

    const businessIdea = await BusinessIdea.findById(businessIdeaId);
    if (!businessIdea) {
      return res.status(404).json({ message: "Business idea not found" });
    }

    if (businessIdea.status === "funded") {
      return res.status(400).json({ message: "Idea is already funded" });
    }

    if (businessIdea.entrepreneurId.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot connect to your own business idea" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      investorId: req.user._id,
      businessIdeaId,
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already exists",
        status: existingRequest.status,
      });
    }

    const newRequest = new ConnectionRequest({
      investorId: req.user._id,
      businessIdeaId,
      message,
    });

    await newRequest.save();

    if (businessIdea.status === "pending") {
      businessIdea.status = "in discussion";
      await businessIdea.save();
    }

    res.status(201).json({
      _id: newRequest._id,
      businessIdeaId: newRequest.businessIdeaId,
      status: newRequest.status,
      createdAt: newRequest.createdAt,
    });
  } catch (error) {
    console.error("Error in requestConnection Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptConnection = async (req, res) => {
  try {
    const requestId = req.params.id;

    const connectionRequest = await ConnectionRequest.findById(
      requestId
    ).populate("businessIdeaId", "title entrepreneurId");

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    if (
      connectionRequest.businessIdeaId.entrepreneurId.toString() !==
      req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to accept this request" });
    }

    if (connectionRequest.status !== "pending") {
      return res.status(400).json({
        message: `Connection request already ${connectionRequest.status}`,
      });
    }

    connectionRequest.status = "accepted";
    await connectionRequest.save();

    await BusinessIdea.findByIdAndUpdate(connectionRequest.businessIdeaId._id, {
      status: "funded",
    });

    res.status(200).json({
      _id: connectionRequest._id,
      status: connectionRequest.status,
      updatedAt: connectionRequest.updatedAt,
    });
  } catch (error) {
    console.error("Error in acceptConnection Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectConnection = async (req, res) => {
  try {
    const requestId = req.params.id;

    const connectionRequest = await ConnectionRequest.findById(
      requestId
    ).populate("businessIdeaId", "title entrepreneurId");

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    if (
      connectionRequest.businessIdeaId.entrepreneurId.toString() !==
      req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to reject this request" });
    }

    if (connectionRequest.status !== "pending") {
      return res.status(400).json({
        message: `Connection request already ${connectionRequest.status}`,
      });
    }

    connectionRequest.status = "rejected";
    await connectionRequest.save();

    const pendingRequests = await ConnectionRequest.countDocuments({
      businessIdeaId: connectionRequest.businessIdeaId._id,
      status: "pending",
    });

    if (pendingRequests === 0) {
      await BusinessIdea.findByIdAndUpdate(
        connectionRequest.businessIdeaId._id,
        {
          status: "pending",
        }
      );
    }

    res.status(200).json({
      _id: connectionRequest._id,
      status: connectionRequest.status,
      updatedAt: connectionRequest.updatedAt,
    });
  } catch (error) {
    console.error("Error in rejectConnection Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getConnections = async (req, res) => {
  try {
    let connections;

    if (req.user.role === "investor") {
      connections = await ConnectionRequest.find({
        investorId: req.user._id,
      })
        .populate({
          path: "businessIdeaId",
          select: "title category fundingRequired status",
          populate: {
            path: "entrepreneurId",
            select: "name email",
          },
        })
        .sort({ createdAt: -1 });
    } else if (req.user.role === "entrepreneur") {
      const businessIdeas = await BusinessIdea.find({
        entrepreneurId: req.user._id,
      });

      const ideaIds = businessIdeas.map((idea) => idea._id);

      connections = await ConnectionRequest.find({
        businessIdeaId: { $in: ideaIds },
      })
        .populate({
          path: "investorId",
          select: "name email phone location",
        })
        .populate({
          path: "businessIdeaId",
          select: "title category fundingRequired status",
        })
        .sort({ createdAt: -1 });
    }

    res.status(200).json(connections || []);
  } catch (error) {
    console.error("Error in getConnections Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
