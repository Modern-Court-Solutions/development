type Config = {
  method: "GET";
  headers: {
    "Content-Type": "application/json";
    Authorization: string;
  };
};

type Status = {
  id: number;
  status: string;
};

type Judge = {
  id: number;
  f_name: string;
  l_name: string;
};

type CaseType = {
  id: number;
  case_type: string;
};

type Counsel = {
  id: number;
  f_name: string;
  l_name: string;
  attorney_id: number;
  barnum: string;
  case: string;
};

type Participant = {
  id: number;
  f_name: string;
  l_name: string;
  participant_id: string;
};

type CaseEvent = {
  id: number;
  name: string;
  start: string;
  end: string;
};

type Note = {
  id: number;
  note: string;
  date_created: string;
  title: string;
};

type CaseDocument = {
  id: number;
  name: string;
  document_type: string;
  date_submitted: string;
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
  judge: Judge;
  date_filed: string;
  file_number: string;
  mover_counsel: Counsel[];
  responder_counsel: Counsel[];
  movers: Participant[];
  responders: Participant[];
  events: CaseEvent[];
  case_notes: Note[];
  documents: CaseDocument[];
};
