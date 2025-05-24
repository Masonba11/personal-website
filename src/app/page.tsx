import { resumeData } from "@/data/resume";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{resumeData.name}</h1>
        <p className="text-xl text-gray-600">{resumeData.title}</p>
        <p className="text-gray-500">{resumeData.location}</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-700">{resumeData.about}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{edu.school}</h3>
              <p className="text-gray-600">
                {edu.degree} in {edu.major}
              </p>
              <p className="text-gray-500">GPA: {edu.gpa}</p>
              <p className="text-gray-500">
                Expected Graduation: {edu.graduation}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{exp.company}</h3>
              <p className="text-gray-600">{exp.title}</p>
              <p className="text-gray-500">
                {exp.location} • {exp.period}
              </p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-700">Email: {resumeData.email}</p>
          <p className="text-gray-700">Phone: {resumeData.phone}</p>
        </div>
      </section>
    </div>
  );
}
