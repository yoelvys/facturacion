import Moment from "moment";
Moment.locale("es");

export const formatDate = (date, format) => Moment(date).format(format);
