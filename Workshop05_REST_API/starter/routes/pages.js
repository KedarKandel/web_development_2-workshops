const path = require("path");
const express = require("express");

const router = express.Router();

function sendPage(req, res, fileName) {
  res.sendFile(path.join(req.app.locals.publicDir, fileName));
}

router.get("/", (req, res) => {
  // TODO (student): Serve public/index.html.
  try {
    return sendPage(req, res, "index.html");
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/about", (req, res) => {
  // TODO (student): Serve public/about.html.

  try {
    return sendPage(req, res, "about.html");
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/contact", (req, res) => {
  // TODO (student): Serve public/contact.html.
  try {
    return sendPage(req, res, "contact.html");
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/blog", (req, res) => {
  // TODO (student): Keep this route working after moving page routes into this router.
  try {
    return sendPage(req, res, "blog.html");
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
