import Moment from "moment";
Moment.locale("es");

export const formatDate = (date, format) => Moment(date).format(format);

export const round = (val) => Math.round(val * 100) / 100