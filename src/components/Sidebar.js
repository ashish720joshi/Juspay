import React,{useState,useEffect} from "react";
import Icon from "./Icon";


export default function Sidebar() {

  const [offSetX, setOffSetX] = useState(0);
  const [offSetY, setOffSetY] = useState(0);
  const [count, setcount] = useState(0);
  const [clone,setClone]=useState(null);
  const [selectedElement, setselectedElement] = useState();
  const [ifMerge, setifMerge] = useState(null);
  const [actions, setactions] = useState([]);
   const [group, setgroup] = useState([]);



 // var selectedElement;
  // useEffect(() => {
  //   console.log("selectedElementinusefe",selectedElement);
  //   console.log("console",selectedElement!=null);
  //   if(selectedElement)
  //   setifMerge(true);
  //   else
  //   setifMerge(false);
  // }, [selectedElement])


  // useEffect(() => {
    
  
  // }, [ifMerge])

useEffect(() => {
  let element=document.getElementById("catSprite");
  element.addEventListener("click",executeSprite)

}, [])

  const add=(e)=>{

    console.log("add");
    
    var ele=e.target.cloneNode(true);
    setClone(ele);
    // setcount(count+1);
    // ele.setAttribute("id",`${e.target.id} ${count}`);
 //   console.log("left",e.clientX);
    //clone's current position with respect to cursor
    setOffSetX(e.clientX-e.target.getBoundingClientRect().left);
    setOffSetY(e.clientY-e.target.getBoundingClientRect().top);
  }

  const dragStart=(e)=>{
    var ele=e.target;
    setselectedElement(ele);
   // selectedElement=ele;
    console.log("in drag start",selectedElement);
    setOffSetX(e.clientX-ele.getBoundingClientRect().left);
    setOffSetY(e.clientY-ele.getBoundingClientRect().top);
    console.log("ifMerge123",ifMerge)
  }

  const dragEndClone=(e)=>{
    if(!ifMerge){
    var ele=e.target;
    console.log("ifMerge",ifMerge);
    console.log("in end");
    ele.style.left=`${e.pageX-offSetX}px`;
    ele.style.top=`${e.pageY-offSetY}px`;
    ele.style.position='absolute';
    //setselectedElement(null);
    }
  }

  //merge div
  const onDrop=(e)=>{
    e.preventDefault();
    console.log("inside ondrop");
    //merging two divs

  //  if(ifMerge){
  //     var element=e.target;
  //     var ele=document.getElementById("midarea");
  //     var newDiv=document.createElement("div");
  //     ele.appendChild(newDiv);
  //     newDiv.appendChild(element);
  //     console.log("selectedEEEEE",selectedElement);
  //     newDiv.appendChild(selectedElement);
  //     newDiv.addEventListener("dragstart",dragStart);
  //     newDiv.addEventListener("dragend",dragEndClone);
  //    newDiv.addEventListener("dragover",dragOver);
  //  // element.appendChild(selectedElement);
  //   console.log("elementttt",element);

  //   }
    var element=e.target;
  console.log("dragoerelemnt",element.offsetWidth);
 if(selectedElement!=null){
    console.log("inside selectedelement not null")
  selectedElement.style.left=`${element.getBoundingClientRect().left}px`;
  selectedElement.style.position="absolute";
  selectedElement.style.top=`${element.getBoundingClientRect().bottom}px`;
  setifMerge(true);
  }



  }
  const allowDrop=(e)=>{
    e.preventDefault();
  }

  const dragEnd=(e)=>{
 
    var ele=document.getElementById("midarea");
    ele.appendChild(clone);
    
    clone.style.left=`${e.pageX-offSetX}px`;
    clone.style.top=`${e.pageY-offSetY}px`;
    clone.style.position='absolute';
    clone.addEventListener("dragstart",dragStart);
    clone.addEventListener("dragend",dragEndClone);
    clone.addEventListener("click",click);
    let grp=[...group];
    console.log(grp);
    grp.push({
      id:clone.id,
      element:clone
    })
    setgroup(grp);
    console.log(clone.id);
    //clone.addEventListener("dragover",allowDrop) ;
  //  clone.addEventListener("drop",onDrop) ; //using to merge two divs
    console.log("clone",clone)
    
    
  }

  const getRotation=()=>{
    var style=window.getComputedStyle(catSprite,null);
    var tr=style.getPropertyValue("-webkit-transform") ||
    style.getPropertyValue("-moz-transform") ||
    style.getPropertyValue("-ms-transform") ||
    style.getPropertyValue("-o-transform") ||
    style.getPropertyValue("transform") ||
    "fail...";
  
  if( tr !== "none") {

    var values = tr.split('(')[1];
      values = values.split(')')[0];
      values = values.split(',');
    var a = values[0];
    var b = values[1];
   
    var radians = Math.atan2(b, a);
    var angle = Math.round( radians * (180/Math.PI));

  } else {
    var angle = 0;
  }
console.log("angle",angle);
  return angle;
  }

  const getTranslateValues=(element)=>{
    const style=window.getComputedStyle(element);
    const matrix=style['transform'] ;
    console.log(matrix);

    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0
      }
    }
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      }
    }
  
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      }
    }
  }

 
  const executeSprite=()=>{
    console.log("in executesprite");
  var flag=false;
  var sprite=false;


   
  for(let i=0;i<group.length;i++)
  {
    var steps,angle;
    let catSprite=document.getElementById("catSprite");
    
   const {x,y,z}= getTranslateValues(catSprite);
  
    let previewAreaPositionX=document.getElementById("previewArea").getBoundingClientRect().x;
   let previewAreaPositionY=document.getElementById("previewArea").getBoundingClientRect().y;
    let catXPosition=catSprite.getBoundingClientRect().x;
    let catYPosition=catSprite.getBoundingClientRect().y;
    var rotation=getRotation(catSprite);
    // let relativePositionX=catXPosition-previewAreaPositionX;
    // let relativePositionY=rotation==0?0:catYPosition-previewAreaPositionY;
    let relativePositionX=Number(x);
    let relativePositionY=rotation==0?0:Number(y);

    switch(group[i].id)
    {
      case "flagevent":
          flag=true;
        break;

        case "sprite":
          sprite=true;
          break;

          case "move10":
            steps=10;
          if(flag){
            
                let xx=steps*Math.cos(rotation);
                let yy=steps*Math.sin(rotation);
                catSprite.style.transform=`rotate(${rotation}deg) translate(${relativePositionX+xx}px,${relativePositionY+yy}px) `;
                catSprite.style.position="absolute";
          }
            break;

            case "turn15ACW":
              angle=-15;
              if(flag)
              {
            if(steps!=10){relativePositionX=0,relativePositionY=0}
              catSprite.style.transform=` translate(${relativePositionX}px,${relativePositionY}px) rotate(${rotation+angle}deg)`
              catSprite.style.position="absolute";
              }
              break;

              case "turn15CW":
                angle=15;
                if(flag)
                {

            if(steps!=10){relativePositionX=0,relativePositionY=0}
                catSprite.style.transform=`translate(${relativePositionX}px,${relativePositionY}px) rotate(${rotation+angle}deg) `
                catSprite.style.position="absolute";
                }
                break;
                
    }
  }
  }

  

  const click=(e)=>{
    console.log("on click");
    console.log("elementsss",e.target.id);
    
 
  }




  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
    >
      <div className="font-bold"> {"Events"} </div>
      <div id="flagevent" className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
     draggable={true}
     onDragStart={add}
     onDragEnd={dragEnd}

      >
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}

      </div>
      <div id="sprite" className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer" 
       draggable={true}
       onDragStart={add}
       onDragEnd={dragEnd}
       >
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <div id="move10" className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
       draggable={true}
       onDragStart={add}
       onDragEnd={dragEnd}
       >
        {"Move 10 steps"}
      </div>
      <div id="turn15ACW" className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
       draggable={true}
       onDragStart={add}
       onDragEnd={dragEnd}
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div id="turn15CW" className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      draggable={true}
      onDragStart={add}
      onDragEnd={dragEnd}
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>

<br/><br/><br/>
      <div onClick={executeSprite}>
      
      <Icon name="flag" size={50} className="text-green-600 mx-2"
       />
      </div>
    </div>
  );
}
