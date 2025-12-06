import path from "path";
import fs from "fs";
const { createStream } = await import("rotating-file-stream");

// Ensure logs directory exists
const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a rotating write stream (Daily rotation)
export const accessLogStream = createStream("access.log", {
    interval: "1d", // Rotate daily
    path: logDirectory,
    maxFiles: 7, // Keep logs for 7 days (optional)
});

export const dualStream = {
    write: (message) => {
      accessLogStream.write(message);  // write to file
      process.stdout.write(message);   // log to console
    },
  };