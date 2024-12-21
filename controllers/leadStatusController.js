const { getLeadStatuses ,FindAssignedTo , getNonExcludedLeadSources , getCitiesByDealershipAndState , findSoldAT , getStateData} = require("../models/leadStatusModel");

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
      const result = await FindAssignedTo(description);
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
  

const fetchCities = async (req, res) => {
  const { DealershipID, State } = req.body;

  if (!DealershipID || !State) {
    return res.status(400).json({ error: "DealershipID and State are required" });
  }

  try {
    const cities = await getCitiesByDealershipAndState(DealershipID, State);

    if (cities.length === 0) {
      return res.status(404).json({ error: "No cities found for the given criteria" });
    }

    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const getSoldAT = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const result = await findSoldAT(description);

    if (result.error) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchStateData = async (req, res) => {
  try {
    const result = await getStateData();

    if (result.error) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { getAllLeadStatuses,findAssignedTo ,getLeadSources ,fetchCities , getSoldAT , fetchStateData};
