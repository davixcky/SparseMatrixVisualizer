const fileToArrayNumber = (data) => {
    if (typeof data !== 'string')
        throw new Error('data is not a valid string');

    const raw = data.split('\n');
    const lines = raw.splice(0, raw.length - 1);

    return lines.map(line => line.split(' ').map(el => {
        if (isNaN(el))
            throw new TypeError(`the element ${el} is not a valid number`);

        return Number(el);
    }));
};

export {fileToArrayNumber};
