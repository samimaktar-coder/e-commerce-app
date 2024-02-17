export const useOptions = (num) => {
    let options = [];
    for (let i = 1; i <= num; i++) {
        options.push(i);
    }
    return options;
};