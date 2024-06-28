import React from 'react'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, Apple, LineChart, CircleCheckBig, FileDown, ShieldCheck } from 'lucide-react'

const Home = () => {

    const navigate = useNavigate()
    const featuresoptions = [
        { label: 'Workout Tracking', icon: <Dumbbell /> , description: 'Track your workouts progress with detailed insights.' },
        { label: 'Meal Tracking', icon: <Apple /> , description: 'Track your meals and calories with detailed insights.' },
        { label: 'Fitness Records', icon: <LineChart /> , description: 'Track your fitness records with detailed insights.' },
        { label: 'Easy to Use', icon: <CircleCheckBig /> , description: 'Our website is easy to use with a simple interface.' },
        { label: 'Reports Export', icon: <FileDown /> , description: 'Export reports in multiple formats.' },
        { label: 'Trusted Security', icon: <ShieldCheck /> , description: 'Our website is secure and reliable.' }
    ]
  return (
    <>   
        <div className="grid px-3 py-4 md:px-2 md:py-4 lg:px-4 lg:py-6 surface-100 justify-content-between align-items-center">
            <div className='px-3 py-4 md:px-6 md:py-4 lg:px-4 lg:py-6 text-left col-12 md:col-6'>
                <div className='line-height-1'>
                    <div className='text-8xl font-bold sm:text-center md:text-left md:text-7xl lg:text-8xl text-900' style={{ fontFamily: 'Bebas Neue'}}>
                        WORKOUT
                    </div>
                    <div className='text-8xl text-primary-400 font-bold mb-4 sm:text-center md:text-left md:text-7xl lg:text-8xl' style={{ fontFamily: 'Bebas Neue', letterSpacing: "1.5px"}}>
                        GET STRONGER
                    </div>
                </div>
                <p className="mb-3 line-height-3 mx-auto text-primary-500">
                    <strong className='text-primary-500'>Unlock your fitness potential with data. </strong>
                    <span className='font-italic'>Track your workouts, meals, and progress with detailed insights. </span>
                    <strong className='text-primary-500'>See the impact of your effort and achieve your fitness goals faster.</strong> 
                </p>
                <Button label="Get Started" className="mx-auto w-16rem" rounded icon="pi pi-arrow-right" iconPos='right' severity='primary' onClick={() => navigate('/sign-up')}/>
            </div>
            <div className='px-3 py-4 md:px-2 md:py-4 lg:px-4 lg:py-6 col-12 md:col-6'>
                <img src='/hero-image.png' alt='Hero Image' className='border-round-3xl h-14rem sm:h-28rem md:h-20rem w-auto lg:h-24rem xl:h-30rem' />
            </div>
        </div>
      
        <div className="surface-0 text-center px-6 py-8">
            <div className="my-4 font-bold text-4xl">
                <span className="text-900">Track your </span>
                <span className="text-primary-600"> Fitness Records </span>
            </div>
            <div className="text-700 mb-6">By our website you can track your fitness records with detailed insights.</div>
            <div className="grid">
                {featuresoptions.map((option, index) => (
                    <div key={index} className="col-12 md:col-4 mb-4 px-5">
                        <span className="p-3 shadow-6 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="text-4xl text-primary-500">{option.icon}</i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">{option.label}</div>
                        <span className="text-700 line-height-3">{option.description}</span>
                    </div>
                ))}
            </div>
        </div>
    
        <div className="surface-100 px-4 py-8 md:px-6 lg:px-8">
            <div className="text-700 text-center">
                <div className="text-blue-600 font-bold mb-3">
                    <i className="pi pi-discord"></i>&nbsp;POWERED BY DISCORD
                </div>
                <div className="text-900 font-bold text-5xl mb-3">Join Our Design Community</div>
                <div className="text-700 text-2xl mb-5">
                    Join our Discord server to get access to get updates, features and more.
                </div>
                <Button label='Join Now' icon='pi pi-discord' rounded className='px-5 py-3' severity='primary'/>
            </div>
        </div>
    </>
  )
}

export default Home