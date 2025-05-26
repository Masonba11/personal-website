import { resumeData } from "@/data/resume";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="card">
          <p className="text-gray-700 leading-relaxed mb-6">
            {resumeData.about}
          </p>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
