import Sidebar from "../components/admin/Sidebar";
import DutyDoctorsTable from "../components/admin/DutyDoctorsTable";

export default function DutyDoctors() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <DutyDoctorsTable />
        </main>
      </div>
    </Sidebar>
  );
}