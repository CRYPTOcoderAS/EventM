const axios = require("axios");
const {
  getOrganizations,
  getEventById,
} = require("../controllers/eventbritecontroller");

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

  it("should fetch a specific event from Eventbrite API", async () => {
    const eventId = "688487002157";
    const mockResponse = {
      data: {
        id: eventId,
        name: "Event Name",
        description: { text: "Event description" },
        start: { utc: "2023-07-31T15:00:00Z" },
        end: { utc: "2023-07-31T18:00:00Z" },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await getEventById(eventId);

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.eventbriteapi.com/v3/events/${eventId}/?token=${process.env.API_TOKEN}`
    );

    expect(response).toEqual(mockResponse.data);
  });

  it("should handle errors from Eventbrite API when fetching organizations", async () => {
    axios.get.mockRejectedValue(new Error("API error"));

    await expect(getOrganizations("INVALID_TOKEN")).rejects.toThrow(
      "Error fetching organizations from Eventbrite API"
    );
  });

  it("should handle errors from Eventbrite API when fetching a specific event", async () => {
    const eventId = "688487002157";
    axios.get.mockRejectedValue(new Error("API error"));

    await expect(getEventById(eventId)).rejects.toThrow(
      "Error fetching event from Eventbrite API"
    );
  });
});
