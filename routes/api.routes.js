const { Router } = require("express");

const jsearch = require("../api/index");
const router = Router();

router.get("/api/jobs", async (req, res) => {
  try {
    let jobs = await jsearch.search("React Developer", 1, 1);
    let data = jobs.data;
    console.log(data);
    res.render("api-jobs", { jobs: data });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
