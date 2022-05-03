const mongoose = require("mongoose");

const blogsSchemaModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String },
    href: { type: String },
    body: { type: String },

    subTitle_1: { type: String },
    img_1: { type: String },
    href_1: { type: String },
    body_1: { type: String },

    subTitle_2: { type: String },
    img_2: { type: String },
    href_2: { type: String },
    body_2: { type: String },

    subTitle_3: { type: String },
    img_3: { type: String },
    href_3: { type: String },
    body_3: { type: String },

    subTitle_4: { type: String },
    img_4: { type: String },
    href_4: { type: String },
    body_4: { type: String },

    subTitle_5: { type: String },
    img_5: { type: String },
    href_5: { type: String },
    body_5: { type: String },

    subTitle_6: { type: String },
    img_6: { type: String },
    href_6: { type: String },
    body_6: { type: String },

    subTitle_7: { type: String },
    img_7: { type: String },
    href_7: { type: String },
    body_7: { type: String },

    subTitle_8: { type: String },
    img_8: { type: String },
    href_8: { type: String },
    body_8: { type: String },

    subTitle_9: { type: String },
    img_9: { type: String },
    href_9: { type: String },
    body_9: { type: String },

    subTitle_10: { type: String },
    img_10: { type: String },
    href_10: { type: String },
    body_10: { type: String },

    conclusion_title: { type: String },
    conclusion_body: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const blogsSchema = mongoose.model("blog", blogsSchemaModel);
module.exports = blogsSchema;
