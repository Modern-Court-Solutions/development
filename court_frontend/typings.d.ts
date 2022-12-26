type Status = {
  id: number;
  status: string;
};

type Case = {
  id: number;
  title: string;
  description: string;
  status: Status;
  created: string;
  updated: string;
  creator: string;
  assignee: string;
  priority: string;
  type: string;
  labels: string[];
  comments: string[];
  attachments: string[];
  judge: string;
};
