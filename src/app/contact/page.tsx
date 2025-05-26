import { resumeData } from "@/data/resume";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <div className="card">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Feel free to reach out to me for any opportunities or questions.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {resumeData.email}
                </a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <a
                  href={`tel:${resumeData.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {resumeData.phone}
                </a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <p className="text-gray-600">{resumeData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
