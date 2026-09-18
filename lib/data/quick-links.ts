export type QuickLink = {
  id: number;
  labelVi: string;
  labelEn: string;
  url: string;
};

// Direct links to TTLab project demos/dashboards, shown in the quick-links panel.
export const quickLinks: QuickLink[] = [
  {
    id: 1,
    labelVi: "Bàn Cờ Điện Tử (Chess)",
    labelEn: "Electronic Chessboard",
    url: "https://ttlab.uit.edu.vn/chess",
  },
  {
    id: 2,
    labelVi: "Thu Hoạch Năng Lượng Trong Nhà",
    labelEn: "Indoor Energy Harvesting",
    url: "https://grafana.ttlab.manhthao.uk/public-dashboards/794cd3a9366d463e96e451e9929a4101",
  },
  {
    id: 3,
    labelVi: "Overleaf",
    labelEn: "Overleaf",
    url: "https://overleaf.manhthao.com/",
  },
];
