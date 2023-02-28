import React ,{useState,useEffect} from 'react'
const getlocaldata=()=>{
    const list= localStorage.getItem("todolist");
    if(list){
        return JSON.parse(list);
    }else{
        return [];
    }
}

export default function Todo() {
    const [data,setData]=useState("");
    const [item,setItem]=useState(getlocaldata());
    const [editItem,setEditItem]=useState("");
    const [toggle,setToggle]=useState(false);
    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(item));
    },[item])
    const addItem=()=>{
        if(!data){
            alert("fill something");
        }
        else if(data && toggle){
            setItem(
                item.map((e)=>{
                    if(e.id===editItem){
                        return {...e,name:data};
                    }
                    return e;

                })
            )
            setData("");


        }
        else{
            const getID={
                id:new Date().getTime().toString(),
                name:data,
            };
            setItem([...item,getID]);
            setData("");
        }
    }
    const handleEdit=(i)=>{
        const item_todo_edited=item.find((el)=>{
            return el.id===i;
        });
        setData(item_todo_edited.name);
        setEditItem(i);
        setToggle(true);
        

        
        

    }
    const deleteitem=(index)=>{
        const items=item.filter((curr)=>{
            return curr.id !== index
        })
        setItem(items);
        
    }
    const removeall=()=>{
        setItem([]);
    }
   
  return (
    <>
    <div className="bg-gray-900 w-screen h-screen ">
        <div className="flex  flex-col items-center">
        <img src='./images/notes.png' alt='notes' className="w-32 m-6"></img>
        <div className="">
            <input type="text" placeholder="Add item" className='px-9 py-2' value={data} onChange={(event)=>setData(event.target.value)}></input>
            <i className="fa-solid fa-plus bg-white p-3 add-btn hover:cursor-pointer" onClick={addItem}></i>
        </div>
        <div>
            <button className="bg-white p-3 rounded-md shadow-md m-4 border-collapse" onClick={removeall}>Remove All</button>
        </div>
        <div>
        { item.map((val)=>{
         return (<div className="bg-red-400 flex px-9 py-2 m-3" key={val.id}>
            <h1 className="text-lg">{val.name}</h1>
            <i className="fa-solid fa-pen-to-square add-btn mx-10 hover:cursor-pointer" onClick={()=>handleEdit(val.id)} ></i>
            <i className="fa-solid fa-trash add-btn   hover:cursor-pointer" onClick={()=>deleteitem(val.id)}></i>
        </div>
         )})}
        
        </div>
         

    
        </div>
    </div>
    </>
  )
}
