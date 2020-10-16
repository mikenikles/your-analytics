import {
  add,
  startOfDay,
  startOfHour,
  startOfMonth,
  endOfDay,
  endOfHour,
  endOfMonth,
} from "date-fns";

import { IEvent, sendEvent } from "./api";

interface IFlags {
  from: Date;
  to: Date;
  min: number;
  max: number;
  period: string;
}

const startAndEndPeriodCalculations: {
  [key: string]: {
    getStart: (date: Date) => number;
    getEnd: (date: Date) => number;
  };
} = {
  hour: {
    getStart: (date: Date) => startOfHour(date).getTime(),
    getEnd: (date: Date) => endOfHour(date).getTime(),
  },
  day: {
    getStart: (date: Date) => startOfDay(date).getTime(),
    getEnd: (date: Date) => endOfDay(date).getTime(),
  },
  month: {
    getStart: (date: Date) => startOfMonth(date).getTime(),
    getEnd: (date: Date) => endOfMonth(date).getTime(),
  },
};

const createEvent = (timestamp: Date) => ({
  name: "pageview",
  domain: "local-testing.com",
  url: "http://local-testing.com/tests",
  referrer: "http://www.test-referrer.com",
  screen_size: 800,
  timestamp,
});

const createEventsForPeriod = async (
  current: Date,
  { max, min, period }: IFlags
) => {
  const randomEventsCount = Math.round(Math.random() * (max - min) + min);
  console.log("Creating %s event(s) for %s", randomEventsCount, current);

  let start = startAndEndPeriodCalculations[period].getStart(current);
  let end = startAndEndPeriodCalculations[period].getEnd(current);
  let requestPromises: any[] | null = [];
  for (let i = 0; i < randomEventsCount; i++) {
    let event: IEvent | null = createEvent(
      new Date(Math.random() * (end - start) + start)
    );
    requestPromises.push(sendEvent(event));

    if (requestPromises.length === 150 || i === randomEventsCount - 1) {
      await Promise.all(requestPromises);
      requestPromises = null;
      requestPromises = [];
    }
    event = null;
  }
};

export const performLoadTesting = async (flags: IFlags) => {
  let current = startOfDay(flags.from);
  const end = endOfDay(flags.to);
  while (current.getTime() <= end.getTime()) {
    await createEventsForPeriod(current, flags);
    current = add(current, {
      [`${flags.period}s`]: 1,
    });
    global.gc();
    // console.log(process.memoryUsage())
  }
};
