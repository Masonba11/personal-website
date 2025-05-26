import { resumeData } from "@/data/resume";

export default function Academics() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Academic Background</h1>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {edu.school}
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  {edu.degree} in {edu.major}
                </p>
                <div className="flex gap-4 text-gray-500">
                  <p>GPA: {edu.gpa}</p>
                  <p>Expected Graduation: {edu.graduation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
