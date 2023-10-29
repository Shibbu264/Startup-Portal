import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 



export default function Question ({}){
    const [answers, setAnswers] = useState([""]);
    const [questions, setQuestions] = useState([]);
    const[loading,setloading]=useState(false)
    useEffect(() => {
        // Fetch questions from Django API
        axios.get(`${API_BASE_URL}/api/get-questions/`)
          .then(response => {
           
            setQuestions(response.data.questions);
            setloading(true)
          })
          .catch(error => {
            console.error('Error fetching questions:', error);
          });
      }, []);

      const handleFormSubmit1 = async (e) => {
        e.preventDefault();
    
      
        
        // Assuming answers is an array containing the answers to questions
        const formData = new FormData();
        
        formData.append('answer', JSON.stringify(answers));
       
        
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
  loading?
<div className='flex-1 justify-center items-center'>
<h2 className='my-4 text-black text-2xl text-center font-bold '>Questions:</h2>
<form onSubmit={handleFormSubmit1}>
      <ul className='my-4 text-black  text-2xl font-bold text-center block mx-[20%]'>
        {questions.map((question, index) => (
         <div className="max-w-lg  sm:w-fit my-2 block mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-200" key={index}><li className='my-2 '  key={index}>{index+1+". "+question}</li>
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
          </div> 
        ))}
      </ul>
      <button className='rounded-lg p-2 my-3 w-28 bg-green-500 block mx-auto ' type="submit">Save</button>
      </form>
    
      </div>:
       <div className="flex justify-center items-center my-12">
    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>








)













}