import React, { useState } from 'react'
import { Button } from '../ui/button'



function CreateTest2() {
    const [toggle, setToggle] = useState({
        mcq: 0,
        scq: 0,
        fillBlanks: 0
    })

    const [mcq, setMcq] = useState([{
        id: Date.now(),
        question: "",
        option: ["", "", "", ""]
    }])

    function updateMCQ(id, e){
        setMCQ()
    }

    function addMCQ(){
        console.log('MCQ Added');
    }
    function addSCQ(){
        console.log('SCQ Added');
    }    
    function addFillBlanks() {
      console.log("Fill blanks Added");
    }
  return (
    <div className="flex justify-center items-center gap-5">
      <Button
        onClick={() => {
            addMCQ()
            setToggle((prevState) => ({ ...prevState, mcq: prevState.mcq + 1 }))
        }
        }
      >
        Add MCQ
      </Button>
      <Button
        onClick={() =>{
            addSCQ()
            setToggle((prevState) => ({ ...prevState, scq: prevState.scq + 1 }))
        }
        }
      >
        Add SCQ
      </Button>
      <Button onClick={()=>
        {
            addFillBlanks()
            setToggle(prevState => ({...prevState, fillBlanks: prevState.fillBlanks+1}))}}>Add Fill Blanks</Button>
    </div>
  );
}

export default CreateTest2