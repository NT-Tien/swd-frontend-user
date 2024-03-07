import { format } from 'date-fns';
import { DEFAULT_API_URL, GET_PRODUCT_IMAGE } from '../config/api'

export const displayImage = (url) => {
    return DEFAULT_API_URL + GET_PRODUCT_IMAGE + url.replace('image/', '')
}


export function formatDate(dateString) {
    // Split the date string into parts
    const [date, time] = dateString.split('T');
  
    // Extract year, month, day, hour, minute, and second
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    // Create a Date object
    const formattedDate = new Date(year, month - 1, day, hour, minute);
    // Format the date in a more readable way (e.g., "YYYY-MM-DD hh:mm:ss")
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return formattedDate.toLocaleDateString('en-US', options);
  }
