import {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
} from "date-fns";

const transposeEvents = (items) => {
  if (items) {
    let array = [];

    items.forEach((el) => {
      el.events.forEach((item) => {
        array.push({
          title: item.case.split(":")[1] + " - " + item.case.split(":")[0],
          start: new Date(
            getYear(new Date(item.start)),
            getMonth(new Date(item.start)),
            getDate(new Date(item.start)),
            getHours(new Date(item.start)),
            getMinutes(new Date(item.start)),
            getSeconds(new Date(item.start))
          ),
          end: new Date(
            getYear(new Date(item.end)),
            getMonth(new Date(item.end)),
            getDate(new Date(item.end)),
            getHours(new Date(item.end)),
            getMinutes(new Date(item.end)),
            getSeconds(new Date(item.end))
          ),
          id: el.id,
          info: item,
        });
      });
    });
    return array;
  }
};

export default transposeEvents;
