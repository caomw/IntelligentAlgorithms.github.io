MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [
            ['$', '$'],
            ["\\(", "\\)"]
        ],
        processEscapes: true
    },
    TeX: {
        Macros: {
            IR: '{\\mathbb{R}}', // a simple string replacement
            IC: '{\\mathbb{C}}', // a simple string replacement
            IZ: '{\\mathbb{Z}}', // a simple string replacement
            IN: '{\\mathbb{N}}', // a simple string replacement
            bold: ['\\boldsymbol{#1}', 1] // this macro has one parameter
        }
    }
});




