import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import TopServicesTable from "../../components/admin/TopServicesTable";

function TopServices() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <TopServicesTable />
        </main>
      </div>
    </Sidebar>
  );
}

export default TopServices;
