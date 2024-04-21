const Organization = require("./organization.model");

const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    console.log(error);
  }
};

const createOrganization = async (req, res) => {
  const { body } = req;
  delete body.created;

  try {
    const organizationDoc = new Organization(body);
    const organization = await organizationDoc.save();
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    console.log(error);
  }
};

module.exports = { getOrganizations, createOrganization };
