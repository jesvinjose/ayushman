import Sidebar from "../../components/admin/Sidebar";
import JobPostingsTable from "../../components/admin/JobPostingsTable";

export default function Jobs() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <JobPostingsTable />
        </main>
      </div>
    </Sidebar>
  );
}