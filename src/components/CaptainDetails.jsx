import React ,{useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)
  return (
    <div>
        <div className='w-full  flex flex-row p-6 items-center justify-between'>
                    <div className='flex flex-row gap-3 items-center'>
                      <h2 className='bg-gray-200 px-4 py-3 rounded-full'><i className="text-xl ri-user-3-fill"></i></h2>
                      <h2 className='text-lg font-semibold '>{captain.fullname.firstname + " " + captain.fullname.lastname}</h2>
                    </div>
                    <div className='flex flex-col'>
                      <h2 className='text-lg font-bold'>$265.50</h2>
                      <p className='text-sm '>Earned</p>
                    </div>
        </div>

        <div className='flex p-3 mx-3 bg-gray-200 rounded-lg justify-center gap-5 items-start'>
                    <div className='text-center'>
                      <i className="text-3xl font-thin mb-2 ri-timer-2-line"></i>
                      <h4 className="text-lg font-medium">10.2</h4>
                      <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                      <i className="text-3xl font-thin mb-2 ri-speed-up-line"></i>
                      <h4 className="text-lg font-medium">10.2</h4>
                      <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                    <div className='text-center'>
                      <i className="text-3xl font-thin mb-2 ri-booklet-line"></i>
                      <h4 className="text-lg font-medium">10.2</h4>
                      <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
        </div>
    </div>
  )
}

export default CaptainDetails
