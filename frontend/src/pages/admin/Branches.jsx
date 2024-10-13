import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import BranchesTable from '../../components/admin/BranchesTable'

function Branches() {
  return (
    <Sidebar>
    <div className="flex-grow p-4">
      <main>
        <BranchesTable />
      </main>
    </div>
  </Sidebar>
  )
}

export default Branches