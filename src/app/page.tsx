import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            {resumeData.name}
          </h1>
          <p className="text-2xl text-gray-600 mb-2">{resumeData.title}</p>
          <p className="text-lg text-gray-500">{resumeData.location}</p>
        </header>

        <section className="section">
          <h2>About</h2>
          <div className="card">
            <p className="text-gray-700 leading-relaxed">{resumeData.about}</p>
          </div>
        </section>

        <section className="section">
          <h2>Skills</h2>
          <div className="card">
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Education</h2>
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-gray-900">
                  {edu.school}
                </h3>
                <p className="text-gray-600 mb-2">
                  {edu.degree} in {edu.major}
                </p>
                <div className="flex gap-4 text-gray-500">
                  <p>GPA: {edu.gpa}</p>
                  <p>Expected Graduation: {edu.graduation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold text-gray-900">
                  {exp.company}
                </h3>
                <p className="text-gray-600 mb-2">{exp.title}</p>
                <p className="text-gray-500 mb-4">
                  {exp.location} • {exp.period}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Contact</h2>
          <div className="card">
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {resumeData.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {resumeData.phone}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
