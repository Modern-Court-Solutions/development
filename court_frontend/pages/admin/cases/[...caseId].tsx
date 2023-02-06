import { PaperClipIcon } from "@heroicons/react/20/solid";
import { getData } from "../../../functions/getData";

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const { caseId } = params as { caseId: string[] };
  const [id] = caseId;
  console.log(id);

  const jwt = context.req.cookies.jwt || null;
  if (!jwt) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };
  }
  const courtCase = await getData(`${process.env.DB_URL}/cases?id=${id}`, jwt);
  console.log(courtCase);
  if (!courtCase)
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };

  return {
    props: {
      case: courtCase?.results[0],
      jwt: jwt,
    },
  };
};

type pageProps = {
  case: Case;
};

const CaseView = ({ case: caseData }: pageProps) => {
  console.log(caseData);
  return (
    <div className="h-fit max-h-[85vh] overflow-auto bg-white shadow sm:rounded-lg justify-center mx-32 py-2 w-full lg:w-3/5 ">
      <div className=" ">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {caseData.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            File Number: {caseData.file_number}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {new Date(caseData.date_filed).toLocaleDateString()}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Case Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.title}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Case Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.case_type.case_type}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Judge Assigned
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.judge.f_name} {caseData.judge.l_name}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Movers</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.movers
                  .map(
                    (participant: Participant) =>
                      `${participant.f_name} ${participant.l_name}`
                  )
                  .join(", ")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Mover Counsel
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.mover_counsel
                  .map(
                    (counsel: Counsel) => `${counsel.f_name} ${counsel.l_name}`
                  )
                  .join(", ")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Responders</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.responders
                  .map(
                    (participant: Participant) =>
                      `${participant.f_name} ${participant.l_name}`
                  )
                  .join(", ")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Responder Counsel
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.responder_counsel
                  .map(
                    (counsel: Counsel) => `${counsel.f_name} ${counsel.l_name}`
                  )
                  .join(", ")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Events</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.events
                  .map(
                    (event: CaseEvent) =>
                      `${event.name}: ${new Date(
                        event.start
                      ).toLocaleDateString()} - ${new Date(
                        event.end
                      ).toLocaleDateString()}`
                  )
                  .join(", ")}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {caseData.case_notes.map((note: Note) => (
                  <div key={note.id}>
                    <p className=" text-gray-900 text-xs">
                      {new Date(note.date_created).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-900">
                      {note.title} - {note.note}
                    </p>
                  </div>
                ))}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Documents</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 rounded-md border border-gray-200"
                >
                  {caseData.documents.map((document: CaseDocument) => (
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon
                          className="h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 w-0 flex-1 truncate">
                          {document.document_type} - {document.name} -
                          {new Date(
                            document.date_submitted
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CaseView;
