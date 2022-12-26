import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { format } from "date-fns";
import Link from "next/link";
type Props = {
  cases: Case[];
};

const CourtCaseCard = ({ cases }: Props) => {
  if (cases)
    return (
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-2"
      >
        {cases.slice(0, 20).map((courtCase) => (
          <li
            key={courtCase.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-md font-medium text-gray-900">
                    {courtCase?.title}
                  </h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {courtCase.status.status}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  Status Date:{" "}
                  {format(new Date(courtCase?.status_date), "MM/dd/yyyy")}
                </p>
              </div>
              <div className="flex-shrink-0 rounded-md p-1 -mt-3 bg-gray-300 text-sm">
                {courtCase.case_type.case_type}
              </div>
            </div>
            <div>
              <div className="-mt-px h-10 flex divide-x divide-gray-200">
                <Link href={`/admin/cases/`}>
                  <div className="flex items-center w-full justify-center cursor-pointer">
                    <>
                      <OpenInNewIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm">View Details</span>
                    </>
                  </div>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-2"
    >
      <div>
        <p className="text-2xl">No Cases</p>
      </div>
    </ul>
  );
};

export default CourtCaseCard;
