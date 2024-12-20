const express = require("express");
const { getAllLeadStatuses , findAssignedTo , getLeadSources } = require("../controllers/leadStatusController");

const router = express.Router();

router.get("/lead-statuses", getAllLeadStatuses);
router.get("/lead-asigned", findAssignedTo);
router.get("/lead-sources", getLeadSources);

module.exports = router;
