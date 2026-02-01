export const isValidName = (name: string): boolean => {
    return name.length > 0 && name.length <= 100 && /^[a-zA-Z\s-]+$/.test(name);
};

export const isValidDate = (dateStr: string): boolean => {
    const d = new Date(dateStr);
    return d instanceof Date && !isNaN(d.getTime()) && d < new Date();
};
