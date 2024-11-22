import { FaRibbon, FaTrophy } from "react-icons/fa";
import type { clientTypes } from "../types";
import { Link } from "wouter";

export function Badge({ game, ...args }: clientTypes.Badge) {
  let title: string = "unranked";
  if (args.type === "rank") {
    if (args.rank === 1) title = "1st Place";
    else if (args.rank === 2) title = "2nd Place";
    else if (args.rank === 3) title = "3rd Place";
    else if (args.rank === 4) title = "4th Place";
    else if (args.rank === 5) title = "5th Place";
  }

  return (
    <div className="dropdown">
      <div>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-sm m-1 rounded-full"
        >
          {(() => {
            if (args.type === "participation")
              return (
                <FaRibbon className="text-lg text-orange-400" title={title} />
              );

            if (args.rank === 1)
              return (
                <FaTrophy className="text-lg text-yellow-500" title={title} />
              );
            else if (args.rank === 2)
              return (
                <FaTrophy className="text-lg text-gray-400" title={title} />
              );
            else if (args.rank === 3)
              return (
                <FaTrophy className="text-lg text-amber-600" title={title} />
              );
            else return <FaTrophy className="text-lg" title={title} />;
          })()}
        </div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-1 flex flex-col rounded-box bg-base-100 p-4 shadow"
      >
        <h6 className="mb-1 font-semibold capitalize text-secondary">
          {args.type}
        </h6>

        {args.type === "rank" && <p className="capitalize">{title}</p>}

        <Link
          href={`~/games/${game.id}/leaderboard`}
          className="link max-w-20 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {game.name}
        </Link>
      </div>
    </div>
  );
}
