// ScriptProcessorNode.js

function SendMail() {
    var params = {
        from_name : document.getElementById("nomeCompleto").value,
        email_id : document.getElementById("email_id").value,
        message : document.getElementById("mensagem").value
    }
    emailjs.send("service_os0d6pl", "template_7e92ekr", params).then(function (res){
        alert("sucesso" + res.status);
    })
    
}