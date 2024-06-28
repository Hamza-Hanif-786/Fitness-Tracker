import { Button } from 'primereact/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
            <div className="flex flex-column lg:flex-row justify-content-center align-items-center gap-7">
                <div className="text-center lg:text-right">
                    <div className="mt-6 mb-3 font-bold text-6xl text-900">Are you lost?</div>
                    <p className="text-700 text-3xl mt-0 mb-6">Sorry, we could not find the page.</p>
                    <Button label="Go Home" outlined severity='primary' onClick={() => navigate('/')} />
                </div>
                <div>
                    <img src="/404.png" alt="Image" className="w-full md:w-28rem" />
                </div>
            </div>
        </div>
    </>
  )
}

export default NotFound