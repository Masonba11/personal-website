import { Resume } from "@/types/resume";

export const resumeData: Resume = {
  name: "Mason Ball",
  title: "Student & Entrepreneur",
  email: "masonjball@gmail.com",
  phone: "4807370850",
  location: "Mesa, Arizona",
  about:
    "Sophomore at Chandler-Gilbert Community College on track to graduate with a degree in Applied Data Analytics and Computer Programming. Co-founder of Decption, a streetwear brand that combines creative design with data-driven marketing strategies.",
  skills: ["Python", "Node.js", "HTML", "CSS", "SQL", "Learning & Growing"],
  education: [
    {
      school: "Chandler-Gilbert Community College",
      degree: "Associate in Applied Science",
      major: "Applied Data Analytics and Computer Programming",
      gpa: "3.85",
      graduation: "Expected 2025",
    },
    {
      school: "Mesa Community College",
      degree: "Associate in Applied Science",
      major: "Applied Data Analytics and Computer Programming",
      gpa: "3.83",
      graduation: "Expected 2025",
    },
  ],
  experience: [
    {
      company: "Decption",
      title: "Co-Founder",
      location: "Mesa, Arizona",
      period: "2023 - Present",
      description:
        "Co-founded a streetwear brand that combines creative design with data-driven marketing strategies. Generated over $5,000 in revenue through strategic Facebook Ads campaigns and influencer marketing. Built dashboards to track key metrics and optimize performance.",
    },
  ],
};
