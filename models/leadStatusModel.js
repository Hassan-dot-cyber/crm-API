const connectToDB = require("../Config/db");
const sql = require("mssql");

const getLeadStatuses = async () => {
  const pool = await connectToDB;
  const query = "SELECT LeadStatusID, Description, ParentLeadStatusID FROM LeadStatus";
  const result = await pool.request().query(query);
  return result.recordset;
};


// const connectToDB = require("../config/db");


const findAssignedTo = async (description) => {
  const pool = await connectToDB;

  try {
    // SQL query to perform all operations in one step
    const query = `
      SELECT 
        bp.BusinessID, 
        bp.BusinessName 
      FROM BusinessType bt
      INNER JOIN BusinessParty bp ON bt.BusinessTypeID = bp.BusinessTypeID
      INNER JOIN Employee e ON bp.BusinessID = e.EmployeeID
      WHERE bt.Description = @description AND e.CRM = 1
    `;

    const result = await pool
      .request()
      .input("description", sql.VarChar, description)
      .query(query);

    if (result.recordset.length === 0) {
      return { error: "No businesses with CRM enabled" };
    }

    return result.recordset; // Return matched BusinessID and BusinessName
  } catch (err) {
    console.error("Error fetching business by description:", err);
    throw err;
  }
};


const getNonExcludedLeadSources = async () => {
    const pool = await connectToDB;
  
    try {
      // Query to fetch all lead sources not excluded
      const query = `
        SELECT * 
        FROM LeadSource 
        WHERE LeadSourceID NOT IN (
          SELECT LeadSourceID 
          FROM ExcludedLeadSource
        )
      `;
  
      const result = await pool.request().query(query);
  
      if (result.recordset.length === 0) {
        return { error: "No non-excluded lead sources found" };
      }
  
      return result.recordset;
    } catch (err) {
      console.error("Error fetching non-excluded lead sources:", err);
      throw err;
    }
  };
  
  
module.exports = { getLeadStatuses , findAssignedTo , getNonExcludedLeadSources};
