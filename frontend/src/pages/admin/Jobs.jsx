import Sidebar from "../../components/admin/Sidebar";
// import TreatmentsTable from "../components/admin/TreatmentTable";
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