const express = require("express");
const { getAllLeadStatuses , findAssignedTo , getLeadSources , fetchCities , getSoldAT,fetchStateData} = require("../controllers/leadStatusController");

const router = express.Router();

router.get("/lead-statuses", getAllLeadStatuses);
router.get("/lead-asigned", findAssignedTo);
router.get("/lead-sources", getLeadSources);
router.post("/cities", fetchCities);
router.post("/soldat", getSoldAT);
router.get("/states", fetchStateData);
module.exports = router;
