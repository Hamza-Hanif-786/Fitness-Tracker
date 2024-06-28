import React from 'react'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FloatLabel } from 'primereact/floatlabel';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Constants from '../Constants';
                        

const Contact = () => {
  const FAQs = () => {
    return Constants.FAQs.map((faq, index) => {
      return (
        <AccordionTab header={faq.question} key={index}>
          {faq.answer}
        </AccordionTab>
      )
    })
  }

  return (
    <>
      <div className='surface-100'>
        <div className="grid grid-nogutter p-6">
          <div className="col-12 md:col-6 bg-no-repeat bg-cover p-8 h-full" style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/contactpage.png')" }}>
            <div className="text-white text-2xl font-semibold mb-6">Contact Us</div>
            <div className="text-gray-300 line-height-3 mb-6">
              Ready to Reach Your Fitness Goals? We're Here to Help Every Step of the Way. 
            </div>
            <a className="inline-flex align-items-center text-primary-300 font-bold no-underline cursor-pointer">
              <span className="mr-3">View Address on Google Maps</span>
              <i className="pi pi-arrow-right"></i>
            </a>
            <ul className="list-none p-0 m-0 mt-6 text-white">
              <li className="flex align-items-center mb-3">
                <i className="pi pi-phone mr-2"></i>
                <span>+92 123456789</span>
              </li>
              <li className="flex align-items-center mb-3">
                <i className="pi pi-twitter mr-2"></i>
                <span>@fitness_tracker</span>
              </li>
              <li className="flex align-items-center">
                <i className="pi pi-inbox mr-2"></i>
                <span>contact@fitnesstracker.com.pk</span>
              </li>
            </ul>
          </div>

          <div className="col-12 md:col-6">
            <div className="p-fluid formgrid grid px-4 py-5 md:px-6 lg:px-8">
              <div className="field col-12 lg:col-6 mb-4">
                <FloatLabel>
                  <InputText id="firstname" type="text" className="py-3 px-2 text-lg" name='firstname' />
                  <label htmlFor="firstname">First Name</label>
                </FloatLabel>
              </div>
              <div className="field col-12 lg:col-6 mb-4">
                <FloatLabel>
                  <InputText id="lastname" type="text" className="py-3 px-2 text-lg" name='lastname'/>
                  <label htmlFor="lastname">Last Name</label>
                </FloatLabel>
              </div>
              <div className="field col-12 mb-4">
                <FloatLabel>
                  <InputText id="email" type="email" className="py-3 px-2 text-lg" name='email' />
                  <label htmlFor="email">Email</label>
                </FloatLabel>
              </div>
              <div className="field col-12 mb-4">
                <FloatLabel>
                  <InputText id="phone" type="tel" className="py-3 px-2 text-lg" name='phone' />
                  <label htmlFor="phone">Phone</label>
                </FloatLabel>
              </div>
              <div className="field col-12 mb-4">
                <FloatLabel>
                  <InputTextarea id="message" rows={5} cols={5} autoResize className="py-3 px-2 text-lg overflow-hidden" name="message" />
                  <label htmlFor="message">Message</label>
                </FloatLabel>
              </div>
              <div className="col-12 text-right">
                <Button type="button" className="px-5 py-3 w-auto" label='Submit' icon='pi pi-envelope' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='surface-section text-800 px-4 py-6 md:px-6'>
        <div className='grid'>
          <div className="col-12 md:col-3">
            <span className="block font-bold text-3xl mb-3">Frequently Asked Questions</span>
            <div className="text-700 line-height-3">
              Your Fitness Results. Get the Answers You Need to Achieve Your Goals.
            </div>
          </div>
          <div className='col-12 md:col-9 md:px-5'>
            <Accordion>
              {FAQs()}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact