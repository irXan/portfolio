import { Helmet } from "react-helmet-async";

const SEO_DATA = {
  name: "Irzan Ahmad",
  title: "Irzan Ahmad — MERN & Flutter Developer | Karachi, Pakistan",
  description:
    "Full-stack developer from Karachi building web apps with the MERN stack and cross-platform mobile apps with Flutter, Dart, Firebase, and Supabase. Open to freelance and full-time roles.",
  keywords:
    "MERN stack developer, React developer, Node.js, MongoDB, Express, Flutter developer, Dart, Firebase, Supabase, full-stack developer Karachi, Pakistan, mobile app developer, hire developer",
  url: "https://irzan.vercel.app",
  image: "https://irzan.vercel.app/og-image.png",
  twitterHandle: "@irXan",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SEO_DATA.name,
  url: SEO_DATA.url,
  image: SEO_DATA.image,
  description: SEO_DATA.description,
  jobTitle: "Full-Stack Developer",
  worksFor: { "@type": "Organization", name: "Freelance" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [
    "https://github.com/irXan",
    "https://linkedin.com/in/IrzanAhmad",
    "https://instagram.com/loo_kinforme",
  ],
  knowsAbout: [
    "MERN Stack",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Flutter",
    "Dart",
    "Firebase",
    "Supabase",
    "Mobile App Development",
    "REST APIs",
  ],
};

export default function SEO() {
  return (
    <Helmet>
      <html lang="en" />
      <title>{SEO_DATA.title}</title>
      <meta name="description" content={SEO_DATA.description} />
      <meta name="keywords" content={SEO_DATA.keywords} />
      <meta name="author" content={SEO_DATA.name} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={SEO_DATA.url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={SEO_DATA.url} />
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:description" content={SEO_DATA.description} />
      <meta property="og:image" content={SEO_DATA.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Irzan Ahmad Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_DATA.twitterHandle} />
      <meta name="twitter:creator" content={SEO_DATA.twitterHandle} />
      <meta name="twitter:title" content={SEO_DATA.title} />
      <meta name="twitter:description" content={SEO_DATA.description} />
      <meta name="twitter:image" content={SEO_DATA.image} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
