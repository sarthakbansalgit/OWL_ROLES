import path from "path";
import fs from "fs";

// For development, use simple console-based logging
// rotating-file-stream can have module resolution issues with ES modules
export const accessLogStream = {
  write: (message) => {
    console.log(message.trim());
  }
};

export const dualStream = {
  write: (message) => {
    console.log(message.trim());
  },
};