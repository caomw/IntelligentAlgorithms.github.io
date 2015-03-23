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




// function to display a gist

function displayJuliaFile(){
    $('.gist').each(function(i, obj) {
        var url = obj.innerHTML;
        obj.innerHTML = "";

        $.getJSON( url, function( data ) {
            //console.log(data);
            
            $.each(data.cells, function( index, value ) {
                var input = $( "<pre class=\"matlab\">"+ value.source +"</pre>" );
                
                $(obj).append(input);

                if(value.outputs.length > 0){

                    if (typeof value.outputs[0].data != 'undefined') {
                      if (typeof value.outputs[0].data["text/plain"] != 'undefined') {
                      $(obj).append( "<pre class=\"output\">"+value.outputs[0].data["text/plain"]+"</pre>" ); 

                    }
                    }

                    if (typeof value.outputs[0].text != 'undefined') {
                      
                      $(obj).append( "<pre class=\" output\">"+value.outputs[0].text+"</pre>" );    
                    
                    }

        

                    
                }
                
            });
        }).done(function() {
            $("pre.matlab").each(function (i, e) {
        //alert(e.innerHTML);
        hljs.highlightBlock(e);
    });
          })
    });
    
   
    
}