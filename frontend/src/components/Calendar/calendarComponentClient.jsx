import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
//import DemoLink from "./demoLinkComponent";
import events from "./clientEvents"; //change to './clientEvents' for client events
import * as dates from "./dates";
import "react-big-calendar/lib/css/react-big-calendar.css";

/*
Student calendar component uses react-big-calendar library. This is just the component, didn't want to clutter the other pages, so when we plan on using this, call "<Basic/>"
*/

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function ClientCalendar({
  localizer = mLocalizer,

  ...props
}) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },

      defaultDate: new Date(2024, 2, 1),
      max: dates.add(dates.endOf(new Date(2024, 4, 1), "day"), -1, "hours"),
      //views: ['month']
      views: Object.keys(Views).map((k) => Views[k]), //<-- adds multiple viewing options (week, day, workweek) it causes errors)
    }),
    []
  );

  return (
    <Fragment>
      <div className="h-screen" {...props}>
        <Calendar
          components={components}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          max={max}
          showMultiDayTimes={true}
          step={60}
          views={views}
        />
      </div>
    </Fragment>
  );
}
ClientCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
};
