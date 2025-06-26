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

export interface DetailData {
  inspectionId?: number;
  companyName: string;
  productName: string;
  inspector: string;
  inspectionDate: string; // or Date
  nextInspectionDate: string;
  inspectionHistory: string;
  inspectionType: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  details: {
    itemName: string;
    systemCheck: string;
    checkMethod: string;
    checkResult: string;
  }[];
}
