export interface CertificateItem {
  index: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  credentialId: string;
  verifyUrl: string;
}

export const certificates: CertificateItem[] = [
  {
    index: "01",
    title: "Introduction to Web Design and Development",
    issuer: "LinkedIn",
    year: "2026",
    category: "Website development",
    credentialId: "907fa0c3f5a67b615e4c71c15862c0c680bc9d396fb219b2ce13294f44d2095a",
    verifyUrl: "https://www.linkedin.com/learning/certificates/907fa0c3f5a67b615e4c71c15862c0c680bc9d396fb219b2ce13294f44d2095a",
  },
  {
    index: "02",
    title: "Build Complete Tours and Travel Management System with Paypal Payment in PHP MySQL Bootstrap and PDO",
    issuer: "Udemy",
    year: "2024",
    category: "Website Development",
    credentialId: "UC-9618042c-2e2a-4186-9897-64b01dfc5837",
    verifyUrl: "https://www.udemy.com/certificate/UC-9618042c-2e2a-4186-9897-64b01dfc5837/",
  },
  {
    index: "03",
    title: "Interaction Design Specialist & Design Systems [GANTI]",
    issuer: "Nielsen Norman Group (NN/g)",
    year: "2024",
    category: "Design & Systems",
    credentialId: "NNG-IXD-4890-GANTI",
    verifyUrl: "https://www.nngroup.com",
  },
  {
    index: "04",
    title: "Google UX Design Professional Specialization [GANTI]",
    issuer: "Google Career Certificates",
    year: "2023",
    category: "Professional",
    credentialId: "GOOG-UX-33918-GANTI",
    verifyUrl: "https://coursera.org/verify/professional-cert",
  },
  {
    index: "05",
    title: "TensorFlow & AI Foundations for Web [GANTI]",
    issuer: "DeepLearning.AI",
    year: "2023",
    category: "Architecture & Tech",
    credentialId: "DLAI-TF-2019-GANTI",
    verifyUrl: "https://coursera.org/verify/specialization",
  },
];
