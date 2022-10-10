import EventIcon from "@mui/icons-material/Event";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getCookies } from "cookies-next";
import Link from "next/link";
type Props = {
  cases: Case[];
};

const CurrentCourtCases = ({ cases }: Props) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-2"
    >
      <button
        onClick={() => {
          console.log("cookieInfo", getCookies());
        }}
      >
        Click
      </button>
      {cases.map((courtCase) => (
        <li
          key={courtCase.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {courtCase.name}
                </h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {courtCase.status}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                {courtCase.description}
              </p>
            </div>
            <div className="flex-shrink-0 rounded-md p-1 bg-gray-300">
              {courtCase.type}
            </div>
          </div>
          <div>
            <div className="-mt-px h-10 flex divide-x divide-gray-200">
              <Link href={`/admin/cases/`}>
                <div className="flex items-center w-1/2 justify-center cursor-pointer">
                  <>
                    <OpenInNewIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm">View Details</span>
                  </>
                </div>
              </Link>
              <Link
                href={`/admin/calendar/${courtCase.id}`}
                className="cursor-pointer"
              >
                <div className="flex w-1/2 items-center justify-center cursor-pointer">
                  <>
                    <EventIcon
                      className="h-5 w-5 text-gray-400 text-sm"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm">View in Calendar</span>
                  </>
                </div>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurrentCourtCases;
