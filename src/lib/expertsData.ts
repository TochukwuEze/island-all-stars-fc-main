// No image imports needed; using public path strings
// Image assets are referenced via public paths; no imports needed

export interface Expert {
  name: string;
  role: string;
  image: any;
  slug: string;
  description?: string;
}

export const experts = [
  {
    name: "Mr Okeke Azubugwu Kenneth",
    role: "President",
    image: "/images/executives/president1.webp",
    slug: "mr-okeke-azubugwu-kenneth",
    description:
      "President of the Island Football Club. He is a visionary leader who has led the club to success.",
  },
  {
    name: "Mr Ijezie Ben",
    role: "Vice President",
    image: "/images/executives/vp1.webp",
    slug: "mr-ijezie-ben",
    description:
      "Vice President of the Island Football Club. Visionary leader and a well known football icon.",
  },
  {
    name: "Mr Uche Onoro",
    role: "Secretary General",
    image: "/images/executives/secretaryGeneral1.webp",
    slug: "mr-uche-onoro",
    description: "Secretary General of the Island Football Club. ",
  },
  {
    name: "Mr Nwankwo Reginald Emeka",
    role: "Assistant Secretary General",
    image: "/images/executives/assistantSecretaryGeneral1.webp",
    slug: "mr-nwankwo-reginald-emeka",
    description: "Assistant Secretary General.",
  },
  {
    name: "Mr Celestine Agba",
    role: "Financial Secretary",
    image: "/images/executives/financialSecretary1.webp",
    slug: "mr-celestine-agba",
    description: "Financial Secretary.",
  },
  {
    name: "Mr Ezeude Emmanuel Chukwunonso",
    role: "Assistant Financial Secretary",
    image: "/images/executives/assistantFinancialSecretary1.webp",
    slug: "mr-ezeude-emmanuel-chukwunonso",
    description: "Assistant Financial Secretary.",
  },
  {
    name: "Mr Anthony Molokwu",
    role: "Welfare Director",
    image: "/images/executives/welfareDirector1.webp",
    slug: "mr-anthony-molokwu",
    description: "Welfare Director.",
  },
  {
    name: "Mr Oscar Egwuonwu",
    role: "Assistant Welfare Director",
    image: "/images/executives/assistantWelfareDirector1.webp",
    slug: "mr-oscar-egwuonwu",
    description: "Assistant Welfare Director.",
  },
  {
    name: "Mr Emmanuel Emeka Agukwe",
    role: "P.R.O",
    image: "/images/executives/PRO1.webp",
    slug: "mr-emmanuel-emeka-agukwe",
    description: "Public Relations Officer.",
  },
  {
    name: "Mr Obidike Nonso Christian",
    role: "Assistant P.R.O",
    image: "/images/executives/assistantPRO1.webp",
    slug: "mr-obidike-nonso-christian",
    description: "Assistant Public Relations Officer.",
  },
  {
    name: "Mr Okumbele Ogadi",
    role: "Provost",
    image: "/images/executives/provost1.webp",
    slug: "mr-okumbele-ogadi",
    description: "Provost.",
  },
  {
    name: "Mr Ernest Onyekwere",
    role: "Assistant Provost",
    image: "/images/executives/assistantProvost1.webp",
    slug: "mr-ernest-onyekwere",
    description: "Assistant Provost.",
  },
];

export const getExpertBySlug = (slug: string) =>
  experts.find((e) => e.slug === slug);
