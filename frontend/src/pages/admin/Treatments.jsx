import Sidebar from "../../components/admin/Sidebar";
import TreatmentsTable from "../../components/admin/TreatmentTable";

export default function Treatments() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <TreatmentsTable />
        </main>
      </div>
    </Sidebar>
  );
}
