global.setImmediate = (callback) => {
    process.nextTick(callback);
};
