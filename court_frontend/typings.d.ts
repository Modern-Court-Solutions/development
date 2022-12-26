type Status = {
  id: number;
  status: string;
};

type CaseType = {
  id: number;
  case_type: string;
};

type Case = {
  id: number;
  title: string;
  description: string;
  status_date: string;
  status: Status;
  created: string;
  updated: string;
  creator: string;
  assignee: string;
  priority: string;
  case_type: CaseType;
  labels: string[];
  comments: string[];
  attachments: string[];
  judge: string;
};
