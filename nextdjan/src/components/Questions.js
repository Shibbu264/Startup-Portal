import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = 'http://localhost:8000'; 



export default function Question ({}){
    const [answers, setAnswers] = useState([""]);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        // Fetch questions from Django API
        axios.get('http://localhost:8000/api/get-questions/')
          .then(response => {
           
            setQuestions(response.data.questions);
            
          })
          .catch(error => {
            console.error('Error fetching questions:', error);
          });
      }, []);

      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
      
        
        // Assuming answers is an array containing the answers to questions
        const formData = new FormData();
        
        formData.append('answer_text', JSON.stringify(answers));
        formData.append('user', JSON.stringify(answers));
        console.log(formData.get('answer_text'))
        const authToken = localStorage.getItem('authToken');
    
        try {
            await axios.post(`${API_BASE_URL}/api/save-answers/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`
                },
            }).then((response)=>{console.log(response.data.message);
              alert('Answers saved successfully!');
            })
    
            
        } catch (error) {
          
            alert('Error saving personalized data:', error);
        }
    };

return(
<div className='flex-1 justify-center items-center'>
<h2 className='my-4 text-black text-2xl text-center font-bold '>Questions:</h2>
<form onSubmit={handleFormSubmit}>
      <ul className='my-4 text-black text-2xl font-bold text-center block mx-[20%]'>
        {questions.map((question, index) => (
         <><li className='my-2'  key={index}>{index+1+". "+question}</li>
         <input className='text-black border-y-2 border-x-2  border-blue-500 rounded-lg required'
              type='text'
              key={index.toPrecision(5)}
              id={`question-${question.id}`}
              value={answers[index]}
              onChange={(e) => {
                const updatedAnswers = [...answers];
                updatedAnswers[index] = e.target.value;
                setAnswers(updatedAnswers);
              }}
            />
          </> 
        ))}
      </ul>
      <button className='rounded-lg p-2 my-3 w-28 bg-green-500 block mx-auto ' type="submit">Save</button>
      </form>
    
      </div>








)













}