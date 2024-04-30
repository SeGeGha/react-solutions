export const addYears = (prevDate: Date, years: number) => {
    const year = prevDate.getFullYear() + years;
    const newDate = new Date(prevDate.getTime());
    newDate.setFullYear(year);

    return newDate;
};
