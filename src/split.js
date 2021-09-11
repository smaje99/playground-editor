import Split from 'split-grid';

const $ = selector => document.querySelector(selector);

Split({
    columnGutters: [{
        track: 1,
        element: $('.vertical-gutter')
    }],
    rowGutters: [{
        track: 1,
        element: $('.horizontal-gutter')
    }]
})
