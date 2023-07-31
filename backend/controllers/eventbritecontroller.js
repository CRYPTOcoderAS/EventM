const axios = require("axios");


async function getOrganizations(apiToken) {
  try {
    const url = "https://www.eventbriteapi.com/v3/users/me/organizations/";

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });


    return response.data;
  } catch (error) {
    console.error("Error fetching organizations from Eventbrite API:", error);
    throw new Error("Failed to fetch organizations from Eventbrite API");
  }
}



module.exports = {
  getOrganizations,
};
