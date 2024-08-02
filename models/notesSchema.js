// const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true },
    priority: {
      type: String,
      enum: ["LOW PRIORITY", "MEDIUM PRIORITY", "HIGH PRIORITY"],
      default: "HIGH PRIORITY",
    },
    assignedTo: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["backlog", "todo", "inprogress", "done"],
      default: "todo",
    },
    refUserId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
// Pre-save hook to generate unique slug
notesSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let uniqueSlug = nanoid(5);

  // Check for uniqueness
  while (await this.constructor.findOne({ slug: uniqueSlug })) {
    uniqueSlug = nanoid(5);
  }

  this.slug = `${baseSlug}-${uniqueSlug}`;
  next();
});
const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
