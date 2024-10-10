import dayjs from 'dayjs';

export const radDateFormatter =(date: Date)=>{
    return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
}

export const radDateOnlyFormatter =(date: Date)=>{
    return dayjs(date).format('DD-MM-YYYY')
}