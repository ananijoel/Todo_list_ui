export async function fetchJSON(url,options={}){
    const  headers = {...options.headers, 'Content-Type': 'application/json'}
    const response = await fetch(url, {...options, headers})
    if(response.ok){
        return response.json()
    }
    throw new Error("erreur serveur",{cause:response})
}