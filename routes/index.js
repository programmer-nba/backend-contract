const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMe = require("../lib/authMe");
const { Lawyer, validateLawyer } = require("../model/lawyer/lawyer.models");

router.post("/login", async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({
      lawyer_username: req.body.username,
    });
    // if (!admin) return await checkMember(req, res);
    // if (!admin) {
    //   // await checkManager(req, res);
    //   console.log("member");
    // }
    const validPasswordlawyer = await bcrypt.compare(
      req.body.password,
      lawyer.lawyer_password
    );

    if (!validPasswordlawyer) {
      return res.status(401).send({
        status: false,
        message: "รหัสผ่านไม่ถูกต้อง",
      });
    }
    const token = lawyer.generateAuthToken();
    const responseData = {
      name: lawyer.lawyer_name,
      username: lawyer.lawyer_username,
      position: lawyer.lawyer_position,
    };

    return res.status(200).send({
      status: true,
      token: token,
      message: "เข้าสู่ระบบสำเร็จ",
      result: responseData,
      level: "lawyer",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
});
router.get("/me", authMe, async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded && decoded.row === "lawyer") {
      const id = decoded._id;
      const lawyer = await Lawyer.findOne({ _id: id });
      if (!lawyer) {
        return res
          .status(400)
          .send({ message: "มีบางอย่างผิดพลาด", status: false });
      } else {
        return res.status(200).send({
          name: lawyer.lawyer_name,
          username: lawyer.lawyer_username,
          position: "lawyer",
          level: lawyer.lawyer_position,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
});
module.exports = router;
