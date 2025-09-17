import path from "path";
import fs from "fs";

function getFileById(id) {
  const filePath = path.join(__dirname, "../uploads/ideas", id);
  if (fs.existsSync(filePath)) {
    return {
      path: filePath,
      name: path.basename(filePath),
    };
  }
  return null;
}
export function downloadFile(req, res) {
  const { id } = req.params;
  const file = getFileById(id);
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  res.download(file.path, file.name);
}
