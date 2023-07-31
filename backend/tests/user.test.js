const axios = require("axios");
const { getOrganizations } = require("../controllers/eventbritecontroller");

jest.mock("axios");

describe("Eventbrite API", () => {
  it("should fetch organizations from Eventbrite API", async () => {
   
    const mockResponse = {
      data: [
        {
          id: "org1",
          name: "Organization 1",
        },
        {
          id: "org2",
          name: "Organization 2",
        },
      ],
    };

    axios.get.mockResolvedValue(mockResponse); 

   
    const response = await getOrganizations("KCIV4OKXGX3FO6FDGVYC");

    expect(axios.get).toHaveBeenCalledWith(
      "https://www.eventbriteapi.com/v3/users/me/organizations/",
      {
        headers: {
          Authorization: "Bearer KCIV4OKXGX3FO6FDGVYC",
        },
      }
    );

    expect(response).toEqual(mockResponse.data);
  });


});


