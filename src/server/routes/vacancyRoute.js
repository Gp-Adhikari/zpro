const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const limitter = require("express-rate-limit");

const mongoose = require("mongoose");
const VacancyAnnouncement = mongoose.model("VacancyAnnouncement");
const VacancyApplicant = mongoose.model("VacancyApplicant");

const VacancyAppliedRequirement = require("../middleware/VacancyAppliedRequirements");
const authenticateToken = require("../middleware/authenticateToken");

const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

const root = "../public/AppliedApplicant/";
const validatePath = (user_input, res) => {
  try {
    // if (user_input.indexOf("\0") !== -1) {
    //   return res.status(401).json({
    //     status: false,
    //     message: "Sneeky ?? We're not dumb like you idiot.",
    //   });
    // }
    // if (!/^[A-Za-z0-9\-]+$/.test(user_input)) return;

    // const safe_input = path
    //   .normalize(user_input)
    //   .replace(/^(\.\.(\/|\\|$))+/, "");

    // const path_string = path.join(root, safe_input);
    // if (path_string.indexOf(root) !== -1) {
    //   return res.status(401).json({
    //     status: false,
    //     message: "Sneeky ?? We're not dumb like you idiot.",
    //   });
    // }

    return (validPath = {
      path: String(path.join(root, user_input) + ".pdf"),
      filename: String(user_input + ".pdf"),
    });
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong!",
      status: false,
    });
  }
};

router.get(
  "/vacancy",
  limitter({
    windowMs: 5 * 1000, //5 seconds
    max: 5, //5 requests max
    message: {
      code: 429,
      status: false,
      message: "Too many submits from this IP, Please try again later.",
    },
  }),
  (req, res) => {
    try {
      VacancyAnnouncement.find({}, (err, vacancies) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Something went wrong!", status: false });
        }
        return res.status(200).json({ status: true, vacancies: vacancies });
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Something went wrong!", status: false });
    }
  }
);
router.get("/admin/vacancy", authenticateToken, (req, res) => {
  try {
    VacancyAnnouncement.find({}, (err, vacancies) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Something went wrong!", status: false });
      }
      return res.status(200).json({ status: true, vacancies: vacancies });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
});

router.post("/vacancy/announcement", authenticateToken, (req, res) => {
  try {
    const { title, corporateTitle, noOfVacancy, requirements, salary, type } =
      req.body;

    if (title === undefined || type === undefined)
      return res
        .status(400)
        .json({ status: false, message: "Something went wrong!" });

    const requirementsArray = String(requirements).split("\\");

    const vacancy = new VacancyAnnouncement({
      title: String(title),
      corporateTitle: String(corporateTitle),
      noOfVacancy: parseInt(noOfVacancy),
      requirements: requirementsArray,
      salary: String(salary),
      type: parseInt(type),
    });

    vacancy.save((err) => {
      err
        ? res
            .status(400)
            .json({ status: false, message: "Something went wrong!" })
        : res
            .status(200)
            .json({ status: true, message: "Added Successfully!" });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }
});

router.delete("/vacancy/:id", authenticateToken, (req, res) => {
  try {
    const id = String(req.params.id);
    VacancyAnnouncement.find({ _id: id }).deleteOne((err, msg) => {
      if (err)
        return res
          .status(400)
          .json({ status: false, message: "Something went wrong!" });

      return res.status(200).json({
        status: true,
        Removed: msg.deletedCount,
        message: "Removed.",
      });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
  }
});

// vacancy applicants
router.get("/vacancy/applicants", authenticateToken, (req, res) => {
  try {
    VacancyApplicant.find({}, (err, applicants) => {
      if (err) {
        return res
          .status(400)
          .json({ status: false, message: "Something went wrong!" });
      }

      return res.status(200).json({ status: true, applicants: applicants });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
  }
});

router.get("/applicant/:file/:token", (req, res) => {
  try {
    const token = req.params.token;

    if (token === null)
      return res.status(401).json({ message: "Unauthorized", status: false });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Unauthorized", status: false });

      try {
        const filePath = req.params.file;

        const sanitizedFilePath = validatePath(filePath, res);

        return res.download(
          path.join(__dirname, sanitizedFilePath.path),
          sanitizedFilePath.path
        );
      } catch (error) {
        return res
          .status(400)
          .json({ status: false, message: "Something went wrong." });
      }
    });
  } catch (error) {
    return res.status(404).json({ status: false, message: "File Not Found!" });
  }
});
// router.get("/applicant/:file", (req, res) => {
//   try {
//     const filePath = req.params.file;

//     const sanitizedFilePath = validatePath(filePath, res);

//     return res.download(
//       path.join(__dirname, sanitizedFilePath.path),
//       sanitizedFilePath.path
//     );
//   } catch (error) {
//     return res.status(404).json({ status: false, message: "File Not Found!" });
//   }
// });

router.post("/vacancy/applicants", rateLimiter, (req, res) => {
  try {
    VacancyAppliedRequirement.single("file")(req, res, function (err) {
      if (req.body.applicantName === "") {
        res.json({ status: false, message: "Name field is empty!" });
      } else if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.json({ status: false, message: "PDF only." });
      } else if (err) {
        // An unknown error occurred when uploading.
        res.json({ status: false, message: "PDF only." });
      }

      const filename = req.file.filename;
      const { vacancyAnnouncedID, applicantName, email, ph, address, desc } =
        req.body;

      try {
        VacancyAnnouncement.findById(vacancyAnnouncedID, (err, data) => {
          let vacancyTitle;
          err ? (vacancyTitle = "Removed.") : (vacancyTitle = data.title);

          const applicant = new VacancyApplicant({
            vacancyAnnouncedID: String(vacancyAnnouncedID),
            applicantName: String(applicantName),
            email: String(email),
            vacancyTitle: vacancyTitle,
            ph: parseInt(ph),
            address: String(address),
            desc: String(desc),
            file: filename,
          });
          applicant.save((err) => {
            return err
              ? res
                  .status(400)
                  .json({ status: false, message: "Something went wrong!" })
              : res.json({ status: true, message: "success" });
          });
        });
      } catch (error) {}
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong!" });
  }
});

router.delete("/applicants", authenticateToken, (req, res) => {
  try {
    const filename = String(req.body.id);

    VacancyApplicant.find({ file: filename }).deleteMany((err, result) => {
      if (err)
        return res
          .status(400)
          .json({ status: false, message: "Something went wrong!" });
      else {
        if (
          fs.existsSync(
            path.join(__dirname, `../public/AppliedApplicant/${filename}`)
          )
        ) {
          fs.stat(
            path.join(__dirname, `../public/AppliedApplicant/${filename}`),
            (err, stats) => {
              if (err) {
                return res
                  .status(400)
                  .json({ status: false, message: "Something went wrong!" });
              }

              fs.unlink(
                path.join(__dirname, `../public/AppliedApplicant/${filename}`),
                (err) => {
                  if (err)
                    return res.status(400).json({
                      status: false,
                      message: "Something went wrong!",
                    });
                }
              );
            }
          );
          return res.json({
            status: true,
            message: "Removed.",
            Removed: result.deletedCount,
          });
        } else {
          if (result.deletedCount >= 0) {
            return res.json({
              status: true,
              message: "Removed.",
              Removed: result.deletedCount,
            });
          } else {
            return res.json("No data found");
          }
        }
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong!",
    });
  }
});

module.exports = router;
