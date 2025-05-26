import { resumeData } from "@/data/resume";

export default function Business() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Business Experience</h1>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {exp.company}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xl text-gray-600">{exp.title}</p>
                  <p className="text-gray-500">
                    {exp.location} • {exp.period}
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
