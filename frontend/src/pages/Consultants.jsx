import Sidebar from "../components/admin/Sidebar";
import ConsultantsTable from "../components/admin/ConsultantsTable";

export default function Consultants() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <ConsultantsTable />
        </main>
      </div>
    </Sidebar>
  );
}
