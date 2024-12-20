const { getLeadStatuses ,findAssignedTo , getNonExcludedLeadSources} = require("../models/leadStatusModel");

const getAllLeadStatuses = async (req, res) => {
  try {
    const data = await getLeadStatuses();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching lead statuses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const findAssignedTo = async (req, res) => {
    const { description } = req.query;
  
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }
  
    try {
      const result = await findAssignedTo(description);
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
      res.json(result);
    } catch (err) {
      console.error("Error fetching business by description:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const getLeadSources = async (req, res) => {
    try {
      const result = await getNonExcludedLeadSources();
  
      if (result.error) {
        return res.status(404).json({ error: result.error });
      }
  
      res.json(result);
    } catch (err) {
      console.error("Error fetching lead sources:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  

module.exports = { getAllLeadStatuses,findAssignedTo ,getLeadSources};
