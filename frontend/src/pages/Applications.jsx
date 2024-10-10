import Sidebar from "../components/admin/Sidebar";
import ApplicationsTable from "../components/admin/ApplicationsTable";

export default function Applications() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <ApplicationsTable />
        </main>
      </div>
    </Sidebar>
  );
}
