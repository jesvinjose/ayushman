import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import BookingsTable from "../../components/admin/BookingsTable";

function Bookings() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <BookingsTable />
        </main>
      </div>
    </Sidebar>
  );
}

export default Bookings;
