const axios = require("axios");
// require(dot.env.config());
const apiKey = process.env.apiKey;

class JSearchAPI {
  constructor(apiKey) {
    this.rapidAPIHost = "jsearch.p.rapidapi.com";
    this.rapidAPIKey = apiKey;
  }

  setCommonHeaders() {
    axios.defaults.headers.common["X-RapidAPI-Host"] = this.rapidAPIHost;
    axios.defaults.headers.common["X-RapidAPI-Key"] = this.rapidAPIKey;
  }

  async search(query, page, numPages) {
    this.setCommonHeaders();

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query,
        page,
        num_pages: numPages
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getSearchFilters(query) {
    this.setCommonHeaders();

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search-filters",
      params: {
        query
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getJobDetails(jobId, extendedPublisherDetails = false) {
    this.setCommonHeaders();

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/job-details",
      params: {
        job_id: jobId,
        extended_publisher_details: extendedPublisherDetails.toString()
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getEstimatedSalary(jobTitle, location, radius) {
    this.setCommonHeaders();

    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/estimated-salary",
      params: {
        job_title: jobTitle,
        location,
        radius
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const jSearch = new JSearchAPI(apiKey);

// (async () => {
//   try {
//     // Search for jobs
//     const searchResults = await jSearch.search(
//       "Python developer in Texas, USA",
//       1,
//       1
//     );
//     console.log("Search Results:", searchResults);

//     // Get job search filters
//     const filters = await jSearch.getSearchFilters(
//       "Python developer in Texas, USA"
//     );
//     console.log("Search Filters:", filters);

//     // Get job details
//     const jobId = "fFunVwyb9l4AAAAAAAAAAA==";
//     const jobDetails = await jSearch.getJobDetails(jobId, false);
//     console.log("Job Details:", jobDetails);

//     // Get estimated salary
//     const estimatedSalary = await jSearch.getEstimatedSalary(
//       "NodeJS Developer",
//       "New-York, NY, USA",
//       100
//     );
//     console.log("Estimated Salary:", estimatedSalary);
//   } catch (error) {
//     console.error(error);
//   }
// })();

module.exports = jSearch;
