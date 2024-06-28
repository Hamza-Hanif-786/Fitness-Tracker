import React from 'react'
import { SignIn } from "@clerk/clerk-react"

const MySignIn = () => {
  return (
    <div className='surface-ground flex align-items-center justify-content-center p-6'>
      <SignIn path="/sign-in" />
    </div>
  )
}

export default MySignIn
