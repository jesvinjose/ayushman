import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import TestimonialsTable from '../../components/admin/TestimonialsTable'

function Testimonials() {
  return (
    <Sidebar>
    <div className="flex-grow p-4">
      <main>
        <TestimonialsTable />
      </main>
    </div>
  </Sidebar>
  )
}

export default Testimonials