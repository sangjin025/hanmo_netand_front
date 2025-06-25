export interface InspectionSummary {
  inspectionId: number;
  createdAt: string;
  companyName: string;
  productName: string;
  inspectionDate: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  inspector: string;
}

export interface ListResponse {
  status: number;
  message: string;
  data: {
    content: InspectionSummary[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  timestamp: number;
}
