import moment from 'moment';

export function formattedDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = moment(date).format('YYYY-MM-DD');

    return formattedDate;
}
