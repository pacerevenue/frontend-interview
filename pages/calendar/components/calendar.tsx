import React, {
  Fragment,
  FunctionComponent,
} from "react";

type LayoutProps = {
  children: JSX.Element;
};

type CalendarProps = {
  children: JSX.Element;
};

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col m-4 sm:m-16 mb-8">
      <h1 className="ml-12 my-8 text-2xl font-bold">3rd November 2022</h1>
      {children}
    </div>
  );
};

export const Calendar: FunctionComponent<CalendarProps> = ({ children }) => (
  <div className="flex flex-auto bg-white">
    <div className="w-14 flex-none bg-white border-r ring-gray-100" />
    <div className="grid w-full grid-cols-1 grid-rows-1 h-1440">
      <HourRows />
      {children}
    </div>
  </div>
);

export const HourRows = () => {
  const HOURS = [
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "13PM",
    "14PM",
    "15PM",
    "16PM",
    "17PM",
    "18PM",
    "19PM",
    "20PM",
    "21PM",
    "22PM",
    "23PM",
  ];
  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200"
      style={{ gridTemplateRows: "repeat(48, 30px)" }}
    >
      {HOURS.map((hour) => (
        <Fragment key={hour}>
          <div className="left-0 -ml-14 w-14 pr-2 text-right text-xs text-gray-400">
            {hour}
          </div>
          <div />
        </Fragment>
      ))}
    </div>
  );
};
