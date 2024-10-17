import Sidebar from "../../components/admin/Sidebar";
import ContactDetailsTable from "../../components/admin/ContactDetailsTable";

export default function ContactDetails() {
  return (
    <Sidebar>
      <div className="flex-grow p-4">
        <main>
          <ContactDetailsTable />
        </main>
      </div>
    </Sidebar>
  );
}