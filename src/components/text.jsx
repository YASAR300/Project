import React, {useState,useEffect} from "react";


function DataFetcher(){
    const [data , setData] = useState(null);


    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(responce => responce.json())
        .then(json => setData(json));
    },[]);


    return(
        <div>
            <pre>{JSON.stringify(data,null,2)}</pre>
        </div>
    )
}

export default DataFetcher;