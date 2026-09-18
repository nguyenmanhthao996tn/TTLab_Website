export type TeamMember = {
  id: number;
  nameVi: string;
  nameEn: string;
  titleEn?: string;
  titleVi?: string;
  roleEn?: string;
  roleVi?: string;
  affiliation: string;
  hIndex?: number;
  image: string;
  scholarUrl?: string;
};

// Key members of TTLab (The Things Lab), Faculty of Computer Engineering,
// University of Information Technology (UIT), VNU-HCM.
// Source: TTLab group introduction slides (TTLAB_20260227.pptx).
// Row 1 (3 members): Huy, Fabien, Thao. Row 2 (2 members): Tuan, Kiet.
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    nameVi: "Trịnh Lê Huy",
    nameEn: "Le-Huy Trinh",
    titleEn: "Assoc. Prof.",
    titleVi: "PGS. TS.",
    affiliation: "FCE-UIT",
    hIndex: 10,
    image: "/team/le-huy-trinh.png",
    scholarUrl: "https://scholar.google.com/citations?user=ddL6nWEAAAAJ&hl=vi&oi=ao",
  },
  {
    id: 5,
    nameVi: "Fabien Ferrero",
    nameEn: "Fabien Ferrero",
    titleEn: "Prof.",
    titleVi: "GS.",
    affiliation: "LEAT-UCA",
    hIndex: 35,
    image: "/team/fabien-ferrero.png",
    scholarUrl: "https://scholar.google.com/citations?user=tKraducAAAAJ&hl=vi&oi=ao",
  },
  {
    id: 4,
    nameVi: "Nguyễn Mạnh Thảo",
    nameEn: "Manh-Thao Nguyen",
    titleEn: "Dr.",
    titleVi: "TS.",
    affiliation: "FCE-UIT / LEAT-UCA",
    hIndex: 5,
    image: "/team/manh-thao-nguyen.png",
    scholarUrl: "https://scholar.google.com/citations?user=NzdXEfAAAAAJ&hl=vi&oi=ao",
  },
  {
    id: 3,
    nameVi: "Phan Thanh Tuấn",
    nameEn: "Thanh-Tuan Phan",
    roleEn: "Eng.",
    roleVi: "Kỹ sư",
    affiliation: "FCE-UIT",
    image: "/team/thanh-tuan-phan.jpg",
    scholarUrl: "https://scholar.google.com/citations?user=Y-nsd00AAAAJ&hl=vi",
  },
  {
    id: 2,
    nameVi: "Nguyễn Tuấn Kiệt",
    nameEn: "Tuan-Kiet Nguyen",
    roleEn: "Eng.",
    roleVi: "Kỹ sư",
    affiliation: "RFThings CO., LTD",
    image: "/team/tuan-kiet-nguyen.png",
  },
];
