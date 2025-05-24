export interface Education {
  school: string;
  degree: string;
  major: string;
  gpa: string;
  graduation: string;
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  period: string;
  description: string;
}

export interface Resume {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
}
