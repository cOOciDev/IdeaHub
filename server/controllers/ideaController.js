import Joi from "joi";
import Idea from "../models/Idea.js";
import User from "../models/User.js";
import Parser from "papaparse";

export async function createIdea(req, res) {
  if (!req.file) return res.status(400).json({ error: "فایل PDF الزامی است" });
  const { error, value } = Joi.object({
    title: Joi.string().required(),
    summary: Joi.string().allow(""),
  }).validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const idea = await Idea.create({
    owner_user_id: req.user.sub,
    title: value.title,
    summary: value.summary || "",
    pdf_path: "/" + req.file.path.replace(/\\/g, "/"),
    pdf_size: req.file.size,
  });
  res.status(201).json(idea);
}

export async function listIdeas(req, res) {
  const role = req.user.role;
  let q = {};
  if (role === "user") {
    q.owner_user_id = req.user.sub;
  }
  const ideas = await Idea.find(q).sort({ createdAt: -1 });
  res.json(ideas);
}

export async function exportIdeasCSV(req, res) {
  const ideas = await Idea.find({}).populate("owner_user_id", "phone").lean();
  const rows = ideas.map((i) => ({
    id: str(i._id),
    title: i.title,
    phone: i.owner_user_id?.phone || "",
    createdAt: i.createdAt?.toISOString() || "",
    pdf: i.pdf_path,
  }));
  function str(x) {
    return x == null ? "" : String(x);
  }
  const parser = new Parser({ header: true });
  const csv = parser.unparse(rows);
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="ideas.csv"');
  res.send(csv);
}
