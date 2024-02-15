import Organization from "../models/index.js";

const createOrganization = async (req, res) => {
  try {
    await Organization.sync();
    let manage = Organization.build(req.body);
    const organization = await manage.save();

    if (organization) {
      res.status(200).send({
        success: true,
        organization: organization,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Error saving organization",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export { createOrganization };
