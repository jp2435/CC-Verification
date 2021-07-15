function verificar(){
    let cc = document.getElementById("inputcc").value
    var dc = document.getElementById("inputd_controlo").value
    var dc_calculo = Number(dc.substr(0,1))
    var res = document.getElementById("resultado")
    var erro_sms = document.getElementById("erro")


    
    if (cc.length < 8){
        console.log("Muita pouca coisa")
        erro_sms.style.display="block"
        erro_sms.innerHTML="<h4>Pouca coisa</h4>"
        erro_sms.style.backgroundColor="red"
        erro_sms.style.width="20%"
        
    }else if(cc.length >8){
        console.log("Muita coisa")
        erro_sms.style.display="block"
        erro_sms.innerHTML="<h4>Muita coisa</h4>"
        erro_sms.style.backgroundColor="blue"
        erro_sms.style.width="20%"
        
    }else{
        verificacao()
    }

    function verificacao(){
        const multiplicadores = [9,8,7,6,5,4,3,2]
        var resultado = 0
        const cc_original = []

        // Para guardar os valores sozinhos dados pela string principal
        for(let i = 0; i < cc.length; i++){
            cc_original[i] = Number(cc.substr(i,1))
        }
        //Sendo assim cc_original (Array) mais ou menos igual a cc (String)

        //Para realizar os calculos do algoritmo
        for(let i = 0;i < cc.length; i++){
            resultado += cc_original[i] * multiplicadores[i]
        }

        //Determinar se o dígito de controlo é igual a 0, pois se for a soma é de 10
        if(dc_calculo != 0){
            //Se o dígito de controlo for diferente de 0 o número mantem-se
            resultado += dc_calculo          
        }else{
            resultado += 10
        }

        resultado /= 11 //Resultado final que indica algoriticamente se é valido ou não

        erro_sms.style.display="none" //Para não demonstrar a mensagem de erro caso na primeira vez tenha errado os input's

        //Para verificar se o número é inteiro ou não
        if(Number.isInteger(resultado)){
            //Neste caso o valor é inteiro, então é um cartão válido
            res.style.display="block"
            res.innerHTML="<b>Cartão de cidadão válido</b>"
            res.style.backgroundColor="green"
            res.style.fontSize="25px"
            res.style.width="35%"
        }else{
            //Neste caso o valor não é inteiro, logo não é um cartão válido
            res.style.display="block"
            res.innerHTML="<b>Cartão de Cidadadão inválido</b>"
            res.style.backgroundColor="red"
            res.style.fontSize="25px"
            res.style.width="35%"
        }
        
    }
}