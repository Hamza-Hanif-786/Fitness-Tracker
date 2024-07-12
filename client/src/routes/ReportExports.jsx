import React, { useState, useEffect , useRef} from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'
import { useUser, useAuth } from '@clerk/clerk-react';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import generatePDF, { Resolution } from 'react-to-pdf'
        
const ReportExports = () => {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef()
  const { user } = useUser();
  const { userId } = useAuth()
  const options = { resolution: Resolution.EXTREME }
  const [workoutList, setWorkoutList] = useState([]);
  const [nutritionList, setNutritionList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [stepsCount, setStepsCount] = useState(0);
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [waterDrink, setWaterDrink] = useState(0);

  const header = () => {
    return (
      <div className='flex justify-content-between align-items-center'>
        <span className='text-900 '>Fitness Report</span>
        <Button 
          label="Download" 
          icon="pi pi-download" 
          severity='secondary'
          text
          size='small'
          className='mr-2' 
          onClick={() => generatePDF(targetRef, {filename: 'FitnessTracker-Report.pdf'}, options)}
        />
      </div>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutResponse = await axios.get(`http://localhost:4000/api/workouts?userId=${userId}`);
        setWorkoutList(workoutResponse.data);

        const nutritionResponse = await axios.get(`http://localhost:4000/api/nutritions?userId=${userId}`);
        setNutritionList(nutritionResponse.data);

        const taskResponse = await axios.get(`http://localhost:4000/api/todos?userId=${userId}`);
        setTaskList(taskResponse.data);

        const stepsResponse = await axios.get(`http://localhost:4000/api/stepsCount/${userId}`);
        setStepsCount(stepsResponse.data.currentSteps);

        const caloriesResponse = await axios.get(`http://localhost:4000/api/caloriesBurned/${userId}`);
        setCalories(caloriesResponse.data.caloriesBurned);

        const weightResponse = await axios.get(`http://localhost:4000/api/weightGoal/${userId}`);
        setWeight(weightResponse.data.currentWeight);

        const waterIntakeResponse = await axios.get(`http://localhost:4000/api/waterIntake/${userId}`);
        setWaterDrink(waterIntakeResponse.data.waterIntake);
      } catch (error) {
        console.error('Error fetching data for PDF:', error);
      }
    };

    fetchData();
  }, [userId])

  return (
    <div className='flex flex-column gap-4 justify-content-start align-items-start'>
      <Button label="Export Report" icon="pi pi-file" severity='primary' onClick={() => setVisible(true)}/>
      <Dialog visible={visible} onHide={() => setVisible(false)} maximizable header={header} style={{ width: '60vw' }}>
        <div ref={targetRef}>
          <div className='flex flex-column'>

            <div className='text-white p-4 flex align-content-center bg-bluegray-900'>
              <Avatar image='/logo.png' size='xlarge' className='mr-3' />
              <span className='text-6xl font-bold font-italic' style={{ fontFamily: 'Bebas Neue', letterSpacing: "1.5px"}}>Fitness Tracker</span>
            </div>

            <div className='flex justify-content-between py-4'>
              <div>
                <div className='bg-bluegray-900 p-2'>
                  <span className='text-xl font-bold text-white'>Personal Information</span>
                </div>
                <p className='text-xl px-2'>Name: {user.fullName}</p>
                <p className='text-xl px-2'>Email: {user.primaryEmailAddress.emailAddress}</p>
                <p className='text-xl px-2'>Mobile: {user.phoneNumbers[0].phoneNumber}</p>
              </div>
              <div className='px-2'>
                <img src={user.imageUrl} alt="profile pic" width={300} height={300} />
              </div>
            </div>

            <div className='bg-bluegray-900 p-2'>
              <span className='text-xl font-bold text-white'>Fitness Information</span>
            </div>

            <div className='flex flex-column'>
              <p className='text-xl px-4'>Weight: {weight} kg</p>
              <p className='text-xl px-4'>Steps Count: {stepsCount}</p>
              <p className='text-xl px-4'>Water Intake: {waterDrink} ml</p>
              <p className='text-xl px-4'>Calories Burned: {calories}</p>
              <p className='text-xl px-4'>Workouts: {workoutList.length}</p>
              <p className='text-xl px-4'>Nutritions: {nutritionList.length}</p>
              <p className='text-xl px-4'>Today Tasks: {taskList.length}</p>
            </div>

          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ReportExports
