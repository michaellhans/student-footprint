import moment from 'moment';

export function formattedDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = moment(date).format('YYYY-MM-DD');

    return formattedDate;
}

export function longFormattedDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const code = {
    IF: 'Bachelor of Informatics',
    STI: 'Bachelor of Information System & Technology',
    MIF: 'Master of Informatics'
};
