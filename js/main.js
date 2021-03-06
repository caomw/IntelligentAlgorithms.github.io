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
            console.log(data);
            $.each(data.cells, function( index, value ) {
                console.log(value);
                var input = "<pre class=\"matlab\">" ;
                if(typeof value.source == "string"){
                    input = input + value.source;
                }else{
                    $.each(value.source, function(i,d){input = input + ""+ d +"" ;});
                }
                
                input = input + "</pre>";
                
                $(obj).append(input);
                if(value.outputs.length > 0){
                    console.log(value.outputs);
                    if (typeof value.outputs[0].data != 'undefined') {
                      if (typeof value.outputs[0].data["text/plain"] != 'undefined') {
                        var input = "" ;
                        if(typeof value.outputs[0].data["text/plain"] == "string"){
                            input = input + value.outputs[0].data["text/plain"];
                            $(obj).append( "<pre class=\"output\">"+input+"</pre>" ); 
                        }else{
                            $.each(value.outputs[0].data["text/plain"], function(i,d){input = input + ""+ d +"" ;});
                              $(obj).append( "<pre class=\"output\">"+input+"</pre>" ); 
                            }
                        }

                        
                    }
                    if (typeof value.outputs[0].text != 'undefined') {
                        var input = "" ;

                        if(typeof value.outputs[0].text == "string"){
                            input = input + value.outputs[0].text;
                            $(obj).append( "<pre class=\"output\">"+input+"</pre>" ); 
                        }else{
                            $.each(value.outputs[0].text, function(i,d){input = input + ""+ d +"" ;});
                              $(obj).append( "<pre class=\" output\">"+input+"</pre>" );     
                        }

                        
                    }   
                }
                
            });
        },'json').done(function() {
            $("pre.matlab").each(function (i, e) {
                //alert(e.innerHTML);
                hljs.highlightBlock(e);
            });
          })
    });
   
    
}