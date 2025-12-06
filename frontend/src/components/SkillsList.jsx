"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const w3SchoolsLinks = {
  JavaScript: "https://www.w3schools.com/js/",
  Python: "https://www.w3schools.com/python/",
  React: "https://www.w3schools.com/react/",
  "Node.js": "https://www.w3schools.com/nodejs/",
  "Data Science": "https://www.w3schools.com/datascience/",
  "Machine Learning": "https://www.w3schools.com/python/python_ml_getting_started.asp",
};

export function SkillsList({ skills }) {
  const handleExplore = (skillName) => {
    const link = w3SchoolsLinks[skillName] || "https://www.w3schools.com";
    window.open(link, "_blank");
  };

  return (
    <div className="bg-green-50 p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">
        Identify the skills you need to advance your career
      </h2>
      <div className="mb-8">
        <Input
          placeholder="Search for the most popular skills for a Software Engineer"
          className="bg-white"
        />
      </div>
      <div className="grid gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg"
          >
            <div className="flex items-center gap-6">
              <span className="text-xl font-semibold w-8">{index + 1}</span>
              <span className="font-medium text-lg">{skill.name}</span>
            </div>
            <Button
              variant="link"
              className="text-blue-600 font-medium"
              onClick={() => handleExplore(skill.name)}
            >
              Explore →
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
