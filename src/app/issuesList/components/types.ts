export interface IssueDetailData {
  id: number;
  title: string; // 제목
  priority: "URGENT" | "NORMAL" | "LOW"; // 중요도
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"; // 이슈 상태
  issueType: "BUG" | "INQUIRY" | "FEATURE" | "ETC"; // 이슈 유형
  companyName: string; // 회사명
  companyId?: number; // 회사 ID (선택)
  productCode?: string; // 제품 코드 (선택)
  productName: string; // 제품명
  assigneeName: string; // 담당자 배정
  dueDate: string; // 해결 기한 (ISO 문자열)
  description: string; // 상세 설명
  
}

export type IssueFormData = Omit<IssueDetailData, "id">;

export interface IssueSummary {
  id: number;
  createdAt: string;
  title: string;
  companyName: string;
  productName: string;
  priority: string;
  status: string;
  assigneeName: string;
  issueType: string;
}

export interface IssueListData {
  content: IssueSummary[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/** 전체 API 응답 래퍼 */
export interface ListResponse {
  status: number;
  message: string;
  data: IssueListData;
  timestamp: number;
}
