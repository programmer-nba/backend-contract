//const { DocA, validate } = require("../model/doc_a.model")
const { DocA } = require("../model/doc_a.model")

exports.create = async (req, res) => {
    //new contarct document
    try {
        //  const { error } = validate(req.body);
        const { error } = req.body;
        if (error)
            return res.status(403)
                .send({ message: error.details[0].message, status: false });
        await new DocA({
            ...req.body,
        }).save();

        //--finished
        return res.status(200).send({ status: true, message: "เพิ่มการลงทะเบียนหนังสือสัญญาสำเร็จ" });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }

};
exports.getAllDoc = async (req, res) => {
    //get all contarct document

    try {
        const contract_doc = await DocA.find();

        if (!contract_doc) {
            return res.status(404)
                .send({ status: false, message: "ไม่พบ ร่างหนังสือสัญญา" })
        }
        //--finished
        return res.status(200).send({ status: true, message: "ดึงข้อมูลร่างหนังสือสัญญาสำเร็จ", data: contract_doc });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
exports.getAllDocbyOwnerId = async (req, res) => {
    //get all contarct document by one

    try {
        const id = req.params.id;
        const contract_docs = await DocA.findById(id);

        if (!contract_docs) {
            return res.status(404)
                .send({ status: false, message: "ไม่พบ ร่างหนังสือสัญญา" })
        }
        //--finished
        return res.status(200).send({ status: true, message: "ดึงข้อมูลร่างหนังสือสัญญาสำเร็จ", data: contract_docs });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.getOneDocbyOwnerId = async (req, res) => {
    //get one contarct document by one
    try {
        const id = req.params.id;
        const one_contract_doc = await DocA.findOne(id);

        if (!one_contract_doc) {
            return res.status(404)
                .send({ status: false, message: "ไม่พบ ร่างหนังสือสัญญา" })
        }
        //--finished
        return res.status(200).send({ status: true, message: "ดึงข้อมูลร่างหนังสือสัญญาสำเร็จ", data: one_contract_doc });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }

};


exports.update = async (req, res) => {
    //--update contract document
    //const { tax_id } = req.body
    try {
        if (!req.body)
            return res.status(404)
                .send({ status: false, message: "ส่งข้อมูลร่างหนังสือสัญญา ผิดพลาด1" });

        const id = req.params.id;
        //const a = tax_id.tax_id;
        // รอแก้
        //      if (!req.body.password) {
        DocA.findByIdAndUpdate(id, {
            ...req.body
        }
            , {
                useFindAndModify: false,
                new: true
            })
            .then((item) => {
                if (!item)
                    return res.status(404)
                        .send({ status: false, message: "แก้ไขข้อมูลร่างหนังสือสัญญา ไม่สำเร็จ1" });
                return res.status(200)
                    .send({ status: true, message: "แก้ไข ข้อมูลร่างหนังสือสัญญา สำเร็จ" });
            }).catch((err) => {
                console.log(err);
                return res.status(500)
                    .send({ status: false, message: "มีบางอย่างผิดพลาด :" + id });
            });
        //       }
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
exports.delete = async (req, res) => {

    try {
        const id = req.params.id;

        DocA.findByIdAndDelete(id, { useFindAndModify: false })
            .then((item) => {
                if (!item) {
                    return res.status(404)
                        .send({ message: "ไม่สามารถลบร่างหนังสือสัญญานี้ได้" })
                }
                //--finished
                return res.status(200)
                    .send({ status: true, message: "ลบร่างหนังสือสัญญาสำเร็จ" });
            }).catch((err) => {
                res.status(500).send({
                    message: "เกิดข้อผิดพลาด ในขั้นตอนการลบร่างหนังสือสัญญา",
                    status: false,
                });
            });
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};