function verificar(){
    // let cc = document.getElementById("inputcc").value
    // var dc = document.getElementById("inputd_controlo").value
    // var digitoControlDc = Number(dc[0])
    var res = document.getElementById("resultado")
    var erro_sms = document.getElementById("erro")
    let NumDocumento = document.getElementById('NUMERO_DE_DOCUMENTO').value
    // let [idCivil, digitosControlo] = NumDocumento.split(' ')
    // let cc = idCivil

    if( (NumDocumento.length == 12) || (NumDocumento.length == 13 && NumDocumento.indexOf(' ') == 8) ){
        let idCivil, digitosControlo
        if(NumDocumento.length == 12){
            idCivil = NumDocumento.slice(0,8)
            digitosControlo = NumDocumento.slice(8)
        }else{
            idCivil = NumDocumento.split(' ')[0]
            digitosControlo = NumDocumento.split(' ')[1]
        }
        const multiplicadores = [9,8,7,6,5,4,3,2]
        let resultado = 0

        const idIndividual = idCivil.split('').map(num => {return Number(num)})
        
        idIndividual.forEach((current,index) => {
            resultado += current * multiplicadores[index]
        })
        console.log(idIndividual)
        console.log(resultado)
        // Verificação com 1º digito de controlo
        if(Number(digitosControlo[0]) != 0){
            resultado += Number(digitosControlo[0])
        }else{
            resultado += 10
        }
        console.log(resultado)
        if(Number.isInteger(resultado/11)){
            // Verificação do segundo digito de controlo
            const MultiplicadoreIds = [0,2,4,6]
            const LetrasDigitoControlo = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

            for(let i = 0;i<idIndividual.length;i++){
                if(MultiplicadoreIds.indexOf(i) != -1){
                    idIndividual[i] = idIndividual[i]*2 >= 10 ? (idIndividual[i]*2)-9 : idIndividual[i]*2
                }
            }

            digitosControlo = digitosControlo.split('')
            digitosControlo[0] = Number(digitosControlo[0])*2 >= 10 ? (Number(digitosControlo[0])*2)-9 : Number(digitosControlo[0])*2
            digitosControlo[3] = Number(digitosControlo[3])

            for(let i = 1;i<=2;i++){
                const letter = digitosControlo[i].toUpperCase()
                digitosControlo[i] = LetrasDigitoControlo.indexOf(letter)+10
            }
            digitosControlo[2] = (digitosControlo[2]*2)-9
            console.log('idIndividual: ',idIndividual)
            const idSoma = idIndividual.reduce((accum,curr) => {
                return accum+curr
            })
            const digitosContrSoma = digitosControlo.reduce((accum,curr) => {
                return accum+curr
            })

            resultado = idSoma + digitosContrSoma
            console.log('resultado:',resultado)
            console.log('idSoma', idSoma)
            console.log('digitosControloSoma', digitosContrSoma)
            if(Number.isInteger(resultado/10)){
                res.style.display="block"
                res.innerHTML="<b>Cartão de cidadão válido</b>"
                res.style.backgroundColor="green"
                res.style.fontSize="25px"
                res.style.width="35%"
            }else{
                console.log('la')
                erro_sms.style.display = 'block'
                erro_sms.innerHTML = '<h4>Número inválido</h4>'
                erro_sms.style.backgroundColor = 'red'
                erro_sms.style.width = '20%'
            }
        }
    }else{
        erro_sms.style.display = 'block'
        erro_sms.innerHTML = '<h4>Número inválido</h4>'
        erro_sms.style.backgroundColor = 'red'
        erro_sms.style.width = '20%'
    }
    
    // if (cc.length < 8){
    //     console.log("Muita pouca coisa")
    //     erro_sms.style.display="block"
    //     erro_sms.innerHTML="<h4>Pouca coisa</h4>"
    //     erro_sms.style.backgroundColor="red"
    //     erro_sms.style.width="20%"
        
    // }else if(cc.length >8){
    //     console.log("Muita coisa")
    //     erro_sms.style.display="block"
    //     erro_sms.innerHTML="<h4>Muita coisa</h4>"
    //     erro_sms.style.backgroundColor="blue"
    //     erro_sms.style.width="20%"
        
    // }else{
    //     const multiplicadores = [9,8,7,6,5,4,3,2]
    //     let resultado = 0
        
    //     const ccArray = cc.split('')
    //     for(let i = 0;i<ccArray.length;i++){
    //         ccArray[i] = Number(ccArray[i])
    //     }
    //     for(let i = 0;i<ccArray.length; i++){
    //         resultado += ccArray[i] * multiplicadores[i]
    //     }
        
    //     if(digitoControlDc!=0){
    //         resultado += digitoControlDc
    //     }else{
    //         resultado += 10
    //     }

    //     erro_sms.style.display="none"
    //     if(Number.isInteger(resultado/11)){
    //         // Verificação do segundo digito de controlo
    //         const ccMulti = [0,2,4,6]
    //         const dcLetterNum = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

    //         for(let i = 0;i<ccArray.length;i++){
    //             if(ccMulti.indexOf(i)!=-1){
    //                 ccArray[i] = ccArray[i]*2 >=10 ? (ccArray[i]*2)-9 : ccArray[i]*2
    //             }
    //         }
    //         const dcArray = dc.split('')

    //         dcArray[0] = Number(dcArray[0])*2 >=10 ? (Number(dcArray[0])*2)-9 : Number(dcArray[0])*2
    //         dcArray[3] = Number(dcArray[3])
            
    //         for(let i = 1;i<=2;i++){
    //             const letter = dcArray[i].toUpperCase()
    //             dcArray[i] = dcLetterNum.indexOf(letter)+10                
    //         }
    //         dcArray[2] = (dcArray[2]*2)-9
            
    //         const ccRes = ccArray.reduce((accum,curr) => {
    //             return accum+curr
    //         })
    //         const dcRes = dcArray.reduce((accum,curr) => {
    //             return accum+curr
    //         })
            
    //         resultado = ccRes + dcRes
    //         if(Number.isInteger(resultado/10)){
    //             res.style.display="block"
    //             res.innerHTML="<b>Cartão de cidadão válido</b>"
    //             res.style.backgroundColor="green"
    //             res.style.fontSize="25px"
    //             res.style.width="35%"
    //         }else{
    //             console.log('%c O segundo digito de controlo não é válido', "color: red;")
    //             res.style.display="block"
    //             res.innerHTML="<b>Cartão de Cidadão inválido</b>"
    //             res.style.backgroundColor="red"
    //             res.style.fontSize="25px"
    //             res.style.width="35%"
    //         }

    //     }else{
    //         console.log('%c O primeiro digito de controlo não é válido', "color: red;")
    //         res.style.display="block"
    //         res.innerHTML="<b>Cartão de Cidadão inválido</b>"
    //         res.style.backgroundColor="red"
    //         res.style.fontSize="25px"
    //         res.style.width="35%"
    //     }
    // }
}
